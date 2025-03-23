import react from "@vitejs/plugin-react";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import Inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: 3000,
  // },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/1_app"),
      "@pages": path.resolve(__dirname, "./src/2_pages"),
      "@widgets": path.resolve(__dirname, "./src/3_widgets"),
      "@features": path.resolve(__dirname, "./src/4_features"),
      "@entities": path.resolve(__dirname, "./src/5_entities"),
      "@shared": path.resolve(__dirname, "./src/6_shared"),
    },
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
    compression({
      algorithm: "gzip",
    }),
    ViteImageOptimizer(),
    Inspect(),
    visualizer({
      title: "stats",
      gzipSize: true,
      filename: "stats.html",
      open: true,
    }),
  ],
  build: {
    modulePreload: true,
    cssMinify: true,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const HugeLibraries = ["@reduxjs", "react-dom"];
          if (HugeLibraries.some(libName => id.includes(`node_modules/${libName}`))) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
