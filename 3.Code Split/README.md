# Vue3 Code Split Demo

Demo về **Code Splitting** trong Vue 3 với Vite, bao gồm Router Code Split và Component Code Split.

## 🚀 Tính năng

### 1. Router Code Split
- **Home.vue**: Trang chủ được lazy load
- **Product.vue**: Trang sản phẩm được lazy load
- Sử dụng `() => import()` syntax cho lazy loading routes

### 2. Component Code Split
- **ProductModal.vue**: Popup thêm sản phẩm được lazy load
- Chỉ tải component khi người dùng cần (khi click button)
- Sử dụng `defineAsyncComponent` với loading states

## 📦 Cài đặt

```bash
# Di chuyển vào thư mục dự án
cd "3.Code Split"

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Phân tích bundle (xem code splitting results)
npm run analyze
```

## 🔍 Cách test Code Splitting

### 1. Kiểm tra Network Tab
1. Mở DevTools > Network
2. Reload trang
3. Quan sát:
   - **main chunk**: Được tải đầu tiên
   - **route chunks**: Tải khi navigate đến route mới
   - **component chunks**: Tải khi mở popup

### 2. Test Router Code Split
1. Mở trang chủ (/)
2. Kiểm tra Network tab - chỉ có Home chunk được tải
3. Click "Đi đến trang Sản phẩm"
4. Quan sát Product chunk được tải riêng biệt

### 3. Test Component Code Split
1. Ở trang chủ hoặc trang sản phẩm
2. Click "Mở Popup Thêm Sản phẩm"
3. Quan sát ProductModal chunk được tải riêng biệt
4. Component có loading state và error handling

## 🛠️ Cấu trúc dự án

```
3.Code Split/
├── package.json
├── vite.config.js          # Cấu hình Vite + Bundle analyzer
├── index.html
├── src/
│   ├── main.js             # Entry point
│   ├── App.vue             # Root component với Suspense
│   ├── router/
│   │   └── index.js        # Router với lazy loading
│   ├── views/
│   │   ├── Home.vue        # Route component (lazy)
│   │   └── Product.vue     # Route component (lazy)
│   └── components/
│       └── ProductModal.vue # Async component (lazy)
└── README.md
```

## 💡 Code Split Techniques

### 1. Router Level Code Splitting

```javascript
// router/index.js
const routes = [
  {
    path: '/',
    name: 'Home',
    // Lazy loading route
    component: () => import('../views/Home.vue')
  }
]
```

### 2. Component Level Code Splitting

```javascript
// Trong component
import { defineAsyncComponent } from 'vue'

const AsyncModal = defineAsyncComponent({
  loader: () => import('./ProductModal.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
```

### 3. Manual Chunk Splitting (Vite Config)

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        }
      }
    }
  }
})
```

## 📊 Bundle Analysis

Sau khi chạy `npm run build`, một file `dist/stats.html` sẽ được tạo để visualize:
- Kích thước các chunks
- Dependencies giữa các modules
- Code splitting effectiveness

## 🎯 Lợi ích của Code Splitting

1. **Faster Initial Load**: Giảm thời gian tải trang đầu tiên
2. **Better Caching**: Vendor code ít thay đổi, cache lâu hơn
3. **Lazy Loading**: Chỉ tải code khi cần thiết
4. **Better UX**: Trang tải nhanh hơn, ít blocking

## 🔧 Vite Configuration

- **Plugin Vue**: Hỗ trợ Single File Components
- **Bundle Visualizer**: Phân tích kích thước bundle
- **Manual Chunks**: Tách vendor libraries riêng biệt
- **Tree Shaking**: Tự động loại bỏ dead code

## 📱 Responsive Design

Demo được thiết kế responsive, hoạt động tốt trên:
- Desktop
- Tablet  
- Mobile

## 🎨 UI Features

- **Loading States**: Spinner khi lazy load components
- **Error Handling**: Fallback UI khi load component thất bại
- **Smooth Animations**: Fade in/out effects
- **Modern Design**: Clean, professional interface

## 🔍 Debugging Tips

1. **Network Tab**: Xem chunks được tải khi nào
2. **Console Logs**: ProductModal log khi được tải
3. **Bundle Analyzer**: Phân tích kích thước và dependencies
4. **Performance Tab**: Đo thời gian load các chunks

## 📚 Tài liệu tham khảo

- [Vue 3 Async Components](https://vuejs.org/guide/components/async.html)
- [Vue Router Lazy Loading](https://router.vuejs.org/guide/advanced/lazy-loading.html)
- [Vite Code Splitting](https://vitejs.dev/guide/build.html#chunking-strategy)
- [Web.dev Code Splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

**Happy Coding!** 🎉
