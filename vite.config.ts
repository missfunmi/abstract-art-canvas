import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Terminal from "vite-plugin-terminal";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === "serve"
      ? [
          Terminal({
            console: "terminal",
            output: ["terminal", "console"],
          }),
        ]
      : []),
  ],
  server: {
    allowedHosts: ["a36eb3d78f21ed.lhr.life"],
  },
}));
