# 🌳 Tree Shaking Demo

Demo đơn giản về Tree Shaking với các hàm tính toán cơ bản (cộng, trừ, nhân, chia).

## Tree Shaking là gì?

Tree Shaking là quá trình loại bỏ code không được sử dụng (dead code) khỏi bundle cuối cùng. Điều này giúp:
- ✅ Giảm kích thước bundle
- ✅ Cải thiện hiệu suất tải trang
- ✅ Giảm băng thông sử dụng
- ✅ Tăng tốc độ thực thi

## Cấu trúc Demo

```
4. Tree Shaking/
├── src/
│   ├── main.js              # Chỉ import add() và multiply()
│   └── utils/
│       └── math.js          # 15 hàm toán học
├── vite.config.js           # Tree Shaking BẬT
├── vite.config.no-treeshaking.js  # Tree Shaking TẮT
├── compare-bundles.js       # Script so sánh kích thước
└── README.md
```

## Hàm trong math.js

### Được sử dụng (sẽ được giữ lại):
- ✅ `add(a, b)` - Phép cộng
- ✅ `multiply(a, b)` - Phép nhân

### KHÔNG được sử dụng (sẽ bị loại bỏ):
- ❌ `subtract(a, b)` - Phép trừ
- ❌ `divide(a, b)` - Phép chia
- ❌ `power(a, b)` - Lũy thừa
- ❌ `sqrt(a)` - Căn bậc hai
- ❌ `factorial(n)` - Giai thừa
- ❌ `gcd(a, b)` - Ước chung lớn nhất
- ❌ `lcm(a, b)` - Bội chung nhỏ nhất
- ❌ `isPrime(n)` - Kiểm tra số nguyên tố
- ❌ `digitSum(n)` - Tổng các chữ số
- ❌ `reverseNumber(n)` - Đảo ngược số
- ❌ `percentage(value, total)` - Tính phần trăm
- ❌ `roundTo(number, decimals)` - Làm tròn
- ❌ `average(numbers)` - Trung bình cộng

## Hướng dẫn chạy

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Chạy development server:
```bash
npm run dev
```

### 3. So sánh Tree Shaking:
```bash
# Build cả 2 phiên bản và so sánh
npm run compare
```

### 4. Build riêng lẻ:
```bash
# Build với Tree Shaking (mặc định)
npm run build

# Build không Tree Shaking
npm run build:no-treeshaking
```

## Kết quả mong đợi

### Bundle với Tree Shaking:
- Chỉ chứa `add()` và `multiply()`
- Kích thước nhỏ hơn
- Tối ưu hiệu suất

### Bundle không Tree Shaking:
- Chứa tất cả 15 hàm
- Kích thước lớn hơn
- Chứa code không cần thiết

## Cách hoạt động

1. **Import selective**: `main.js` chỉ import 2 hàm cần thiết
2. **ES Modules**: Sử dụng ES6 modules để Tree Shaking hoạt động
3. **Build process**: Vite/Rollup phân tích dependency graph
4. **Dead code elimination**: Loại bỏ code không được tham chiếu

## Tips Tree Shaking hiệu quả

### ✅ Nên làm:
- Sử dụng ES6 modules (`import`/`export`)
- Import chỉ những gì cần thiết
- Tránh import toàn bộ library
- Sử dụng named imports

```javascript
// ✅ Tốt - chỉ import cần thiết
import { add, multiply } from './math.js';

// ❌ Không tốt - import tất cả
import * as math from './math.js';
```

### ❌ Tránh:
- CommonJS (`require`/`module.exports`)
- Side effects không cần thiết
- Import dynamic không rõ ràng
- Polyfills không cần thiết

## Công cụ phân tích

Sau khi build, mở các file để phân tích:
- `dist/stats-treeshaking.html` - Bundle analyzer với Tree Shaking
- `dist-no-treeshaking/stats-no-treeshaking.html` - Bundle analyzer không Tree Shaking

## Demo trực quan

Mở `index.html` để:
- Test các hàm được sử dụng
- Xem console logs
- Hiểu được cách Tree Shaking hoạt động

---

**Lưu ý**: Demo này được tạo để minh họa khái niệm Tree Shaking. Trong dự án thực tế, sự khác biệt về kích thước sẽ rõ rệt hơn với các library lớn như Lodash, Moment.js, etc.
