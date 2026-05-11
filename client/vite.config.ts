import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
   define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://quiz-builder-vercel-server.vercel.app/'),
        __PROJECT__: JSON.stringify('frontend'),
    },
})