import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This ensures assets are served correctly in production
  base: "/",
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to the Express server in development
      "/customers": "http://localhost:5000",
      "/items": "http://localhost:5000",
      "/invoices": "http://localhost:5000",
    },
  },
});
