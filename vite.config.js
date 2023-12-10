import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { PORT } from './backend/util/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
        secure: false,
      },
    },
    host: '0.0.0.0',
    port: process.env.VITE_PORT || 3000
  }
})
