import { startServer } from "./server.js";
import open from "open";

function readArg(name: string) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function hasFlag(name: string) {
  return process.argv.includes(name);
}

function toPort(value: string | undefined) {
  if (!value) return undefined;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 65535) return undefined;
  return n;
}

async function main() {
  const port = toPort(readArg("--port") ?? process.env.PORT);
  const host = readArg("--host") ?? process.env.HOST ?? undefined;

  const { url } = await startServer({ host, port });
  // Keep output stable for users running via npx
  console.log(`Server running at ${url}`);

  const defaultOpen =
    process.stdout.isTTY && process.env.CI !== "true" && process.env.CI !== "1";
  const shouldOpen =
    (hasFlag("--open") ? true : undefined) ??
    (hasFlag("--no-open") ? false : undefined) ??
    defaultOpen;

  if (shouldOpen) {
    try {
      await open(url);
    } catch {
      // If opening fails (headless, restricted env), server is still running.
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

