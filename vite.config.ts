import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/task-app/', // 👈 IMPORTANTE: Põe o nome exato do teu repositório entre as barras!
})