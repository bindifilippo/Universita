import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/corsi": {
        target: "http://localhost:8085",
        changeOrigin: true,
      },
    },
  },
});