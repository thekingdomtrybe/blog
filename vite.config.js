import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/categories': 'http://localhost:3000',
  //     '/admin': 'http://localhost:3000',
  //     '/minister': 'http://localhost:3000',
  //     '/ministers': 'http://localhost:3000',
  //     '/articles': 'http://localhost:3000',
  //     '/draft': 'http://localhost:3000',
  //     '/search': 'http://localhost:3000',
  //     '/confirm': 'http://localhost:3000',
  //     '/ask': 'http://localhost:3000',
  //     '/uploads': 'http://localhost:3000',
  //   }
  // }
})
