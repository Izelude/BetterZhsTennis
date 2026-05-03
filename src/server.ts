import express from "express";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ZhsClient } from "./zhs/client.js";
import axios from "axios";
import { DateTime } from "luxon";
import type { CourtName } from "./zhs/courts.js";

function parseCookies(cookieHeader: string | undefined) {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(";")) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (!rawKey) continue;
    out[rawKey] = decodeURIComponent(rest.join("="));
  }
  return out;
}

function clearOryCookie(res: express.Response) {
  res.setHeader("Set-Cookie", "ory_session=; Path=/; Max-Age=0; SameSite=Lax");
}

export type StartServerOptions = {
  host?: string;
  port?: number;
};

export async function startServer(opts: StartServerOptions = {}) {
  const host = opts.host ?? "127.0.0.1";
  const port = opts.port ?? 3000;

  const app = express();
  app.use(express.json());

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const publicDir = path.resolve(__dirname, "..", "public");

  app.use(express.static(publicDir));
  app.get("/healthz", (_req, res) => res.status(200).send("ok"));

  app.get("/test", async (_req, res) => {
    try {
      const cookies = parseCookies(_req.headers.cookie);
      const orySession = cookies["ory_session"];
      if (!orySession) {
        return res.status(401).json({ error: "Missing ory_session cookie" });
      }

      const client = new ZhsClient({ orySession });
      const data = await client.listProductSlots({
        court: "Tennisplatz 22 (Kunststoff)",
        input: {
          start: "2026-05-02T22:00:00.000Z",
          end: "2026-05-05T22:00:00.000Z"
        }
      });
      res.status(200).json(data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Upstream non-2xx => assume session expired/invalid
        clearOryCookie(res);
        return res.status(401).json({
          error: `Upstream error ${err.response.status}`,
          upstreamStatus: err.response.status
        });
      }
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  });

  app.post("/api/slots/day", async (req, res) => {
    try {
      const cookies = parseCookies(req.headers.cookie);
      const orySession = cookies["ory_session"];
      if (!orySession) {
        return res.status(401).json({ error: "Missing ory_session cookie" });
      }

      const day = typeof req.body?.day === "string" ? req.body.day : "";
      const courts = Array.isArray(req.body?.courts) ? (req.body.courts as unknown[]) : [];

      if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
        return res.status(400).json({ error: 'Invalid "day". Expected YYYY-MM-DD.' });
      }
      if (!courts.length || !courts.every((c) => typeof c === "string")) {
        return res
          .status(400)
          .json({ error: 'Invalid "courts". Expected a non-empty string array of court names.' });
      }

      // ZHS queries appear to use Munich-local day boundaries (00:00..24:00 Europe/Berlin),
      // encoded as UTC timestamps.
      const start = DateTime.fromISO(day, { zone: "Europe/Berlin" }).startOf("day");
      if (!start.isValid) {
        return res.status(400).json({ error: 'Invalid "day".' });
      }
      const end = start.plus({ days: 1 });

      const input = {
        start: start.toUTC().toISO({ suppressMilliseconds: false }),
        end: end.toUTC().toISO({ suppressMilliseconds: false })
      };
      if (!input.start || !input.end) {
        return res.status(500).json({ error: "Failed to compute timeframe." });
      }

      const client = new ZhsClient({ orySession });

      const uniqueCourts = Array.from(new Set(courts)) as CourtName[];
      const results = await Promise.all(
        uniqueCourts.map(async (court) => {
          const data = await client.listProductSlots({ court, input });
          return [court, data] as const;
        })
      );

      res.status(200).json({
        day,
        timezone: "Europe/Berlin",
        input,
        courts: Object.fromEntries(results)
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        clearOryCookie(res);
        return res.status(401).json({
          error: `Upstream error ${err.response.status}`,
          upstreamStatus: err.response.status
        });
      }
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  });

  app.get("*", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));

  const server = http.createServer(app);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => resolve());
  });

  const url = `http://${host}:${port}/`;
  return { app, server, host, port, url };
}

