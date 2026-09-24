import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Mở IP cho phép điện thoại hoặc máy khác trong mạng truy cập
    port: 3000,
    open: true
  }
})
