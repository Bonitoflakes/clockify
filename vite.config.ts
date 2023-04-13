import { defineConfig } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
    esbuild: {
      pure: mode === "production" ? ["console.log"] : [],
    },
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "./assets"),
        "@src": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components/index"),
        "@utils": path.resolve(__dirname, "./src/utils/index"),
        "@store": path.resolve(__dirname, "./src/globalStore.ts"),
      },
    },
  };
});
