import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { ViteMinifyPlugin } from 'vite-plugin-minify' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteMinifyPlugin({}),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    cssCodeSplit: false,
    // Cấu hình minification để loại bỏ console và debugger
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        }
      }
    }
  },
  // Cấu hình esbuild để loại bỏ console và debugger trong production
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
})
