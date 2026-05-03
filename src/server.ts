import express from "express";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type StartServerOptions = {
  host?: string;
  port?: number;
};

export async function startServer(opts: StartServerOptions = {}) {
  const host = opts.host ?? "127.0.0.1";
  const port = opts.port ?? 3000;

  const app = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const publicDir = path.resolve(__dirname, "..", "public");

  app.use(express.static(publicDir));
  app.get("/healthz", (_req, res) => res.status(200).send("ok"));
  app.get("*", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));

  const server = http.createServer(app);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => resolve());
  });

  const url = `http://${host}:${port}/`;
  return { app, server, host, port, url };
}

