import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: '../static/dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/static/images': 'http://localhost:3000',
      '/contact': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
})
