import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/stats-treeshaking.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    // Tree shaking được bật mặc định trong Vite
    // Chỉ định thư mục output
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Tạo file bundle với tên có thể đọc được
        entryFileNames: 'assets/main-treeshaking.[hash].js',
        chunkFileNames: 'assets/[name]-treeshaking.[hash].js',
        assetFileNames: 'assets/[name]-treeshaking.[hash].[ext]',
      }
    }
  },
})
