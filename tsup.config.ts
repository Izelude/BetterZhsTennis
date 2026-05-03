import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    cli: "src/cli.ts",
    server: "src/server.ts"
  },
  format: ["esm"],
  target: "node22",
  sourcemap: true,
  clean: true,
  dts: false,
  splitting: false,
  shims: false,
  banner: {
    js: "#!/usr/bin/env node"
  }
});

