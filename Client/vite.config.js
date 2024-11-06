import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      // No rewrite needed if your backend expects '/api'
    },
  },
});
