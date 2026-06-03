import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/vehicles': {
        target: 'https://ev-fleet-backend-9yab.onrender.com',
        changeOrigin: true,
      },
      '/fleet': {
        target: 'https://ev-fleet-backend-9yab.onrender.com',
        changeOrigin: true,
      },
      '/telemetry': {
        target: 'https://ev-fleet-backend-9yab.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
