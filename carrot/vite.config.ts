import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: 'window', // global을 window로 설정
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 백엔드 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // '/api'를 제거하고 백엔드로 요청 전달
      },
    },
  },
});

