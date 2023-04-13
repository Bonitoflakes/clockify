import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    // other configuration
    esbuild: {
      pure: mode === "production" ? ["console.log"] : [],
    },
  };
});
