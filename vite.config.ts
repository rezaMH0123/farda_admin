import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      public: `${path.resolve(__dirname, "./public/")}`,
      assets: `${path.resolve(__dirname, "./src/assets")}`,
      components: `${path.resolve(__dirname, "./src/components")}`,
      constants: `${path.resolve(__dirname, "./src/constants")}`,
      pages: `${path.resolve(__dirname, "./src/pages")}`,
      sections: `${path.resolve(__dirname, "./src/sections")}`,
      types: `${path.resolve(__dirname, "./src/types")}`,
    },
  },
});
