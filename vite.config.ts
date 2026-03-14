import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { version } from './package.json'

export default defineConfig({
  define: {
    APP_VERSION: JSON.stringify(version),
  },
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, 'src/app'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/widgets': path.resolve(__dirname, 'src/widgets'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/entities': path.resolve(__dirname, 'src/entities'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
    },
  },
})
