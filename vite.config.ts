import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
    root: "frontend",
    plugins: [react()],
    build: {
        outDir: "../public",
        emptyOutDir: true,
        sourcemap: true
    },
    server: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "frontend/src")
        }
    }
});
