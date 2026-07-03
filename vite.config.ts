import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const githubPagesBase = '/Portfolio-Website/'

export default defineConfig(({ command, mode }) => ({
  base: command === 'serve' && mode === 'development' ? '/' : githubPagesBase,
  plugins: [react(), tailwindcss()],
  build: {
    // Three.js is intentionally isolated in an async renderer chunk.
    chunkSizeWarningLimit: 600,
  },
}))
