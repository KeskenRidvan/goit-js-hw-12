import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/goit-js-hw-12/",
  build: {
    outDir: "dist",
  },
  define: {
    global: "window",
  },
});
