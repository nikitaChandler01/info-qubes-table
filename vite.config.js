import { fileURLToPath, URL } from 'node:url'
import fs from "vite-plugin-fs";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    fs(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services/', import.meta.url)),
      '@mocks': fileURLToPath(new URL('./src/mocks/', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/modules/', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components/', import.meta.url)),
    }
  }
})
