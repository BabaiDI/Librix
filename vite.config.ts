import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@consts": path.resolve(__dirname, "src/consts"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@modals": path.resolve(__dirname, "src/view/modals"),
      "@shared": path.resolve(__dirname, "src/view/shared"),
      "@context": path.resolve(__dirname, "src/context"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});
