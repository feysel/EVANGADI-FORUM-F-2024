import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define environment-specific variables
  define: {
    "process.env": process.env, // Use this to pass env variables
  },
  server: {
    // The proxy configuration works in development mode.
    // In production, you need to directly call the live API endpoint.
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:3000", // Use env variable in production
        changeOrigin: true,
      },
    },
  },
});
