import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/drive-solo-dhaka/', // GitHub Pages project URL
  plugins: [react(), tailwindcss()],
})
