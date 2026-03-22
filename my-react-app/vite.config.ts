import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // These are injected at the top of every .scss file automatically
        additionalData: `@import "variables"; @import "mixins";`,
        loadPaths: [path.resolve(__dirname, 'src/app/styles')],
      },
    },
  },
})
