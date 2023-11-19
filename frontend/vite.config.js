import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
    plugins: [react()],
  },
});
