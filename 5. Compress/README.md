# 🗜️ Nginx Compression Demo - Frontend Optimization

Demo thực hành về **Compression** trong tối ưu hóa Frontend sử dụng Nginx.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Cấu trúc Project](#cấu-trúc-project)
- [Cài đặt và Chạy](#cài-đặt-và-chạy)
- [Test Compression](#test-compression)
- [Cấu hình Nginx](#cấu-hình-nginx)
- [Kết quả Demo](#kết-quả-demo)
- [Best Practices](#best-practices)

## 🎯 Tổng quan

### Compression là gì?

**Compression** (nén) là kỹ thuật giảm kích thước file bằng cách loại bỏ dữ liệu dư thừa hoặc sử dụng thuật toán nén hiệu quả.

### Tại sao quan trọng?

- ⚡ **Tăng tốc độ tải**: Giảm 50-70% kích thước file
- 💾 **Tiết kiệm băng thông**: Giảm data transfer
- 📱 **Mobile-friendly**: Hiệu quả với kết nối chậm
- 🚀 **SEO boost**: Cải thiện Core Web Vitals

### Các loại Compression

1. **Gzip** - Phổ biến nhất, hỗ trợ rộng rãi
2. **Brotli** - Hiệu quả hơn Gzip 15-25%
3. **Deflate** - Cũ hơn, ít hiệu quả

## 📁 Cấu trúc Project

```
5. Compress/
├── nginx.conf              # Cấu hình Nginx với compression
├── docker-compose.yml      # Docker setup cho demo
├── test-compression.sh     # Script test compression
├── README.md              # Hướng dẫn này
├── public/                # Static files để test
│   ├── index.html         # HTML file lớn (~15KB)
│   ├── styles.css         # CSS file lớn (~25KB)
│   └── script.js          # JavaScript file lớn (~20KB)
└── logs/                  # Nginx logs (tự động tạo)
```

## 🚀 Cài đặt và Chạy

### Yêu cầu

- Docker và Docker Compose
- Curl (để test)
- BC calculator (optional, cho tính toán)

### Bước 1: Clone và Setup

```bash
# Chuyển vào thư mục demo
cd "5. Compress"

# Tạo thư mục logs
mkdir -p logs
```

### Bước 2: Khởi chạy Nginx

```bash
# Start server với compression
docker-compose up -d

# Kiểm tra status
docker-compose ps

# Xem logs
docker-compose logs nginx-compression-demo
```

### Bước 3: Truy cập Demo

- **Với compression**: http://localhost:8080/
- **Không compression**: http://localhost:8080/no-compression/

## 🧪 Test Compression

### Automatic Testing

```bash
# Make script executable
chmod +x test-compression.sh

# Run compression tests
./test-compression.sh
```

### Manual Testing với Curl

```bash
# Test với compression
curl -H "Accept-Encoding: gzip, deflate, br" \
     -w "Size: %{size_download} bytes | Time: %{time_total}s\n" \
     -o /dev/null \
     http://localhost:8080/

# Test không compression
curl -w "Size: %{size_download} bytes | Time: %{time_total}s\n" \
     -o /dev/null \
     http://localhost:8080/

# Kiểm tra headers
curl -I -H "Accept-Encoding: gzip" http://localhost:8080/
```

### Testing với Browser DevTools

1. Mở Browser DevTools (F12)
2. Vào tab **Network**
3. Truy cập http://localhost:8080/
4. Kiểm tra:
   - **Size** column: Kích thước file
   - **Response Headers**: `content-encoding: gzip`
   - **Time**: Thời gian tải

## ⚙️ Cấu hình Nginx

### Compression Settings

```nginx
# Enable Gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1000;        # Nén file > 1KB
gzip_proxied any;
gzip_comp_level 6;           # Level 1-9 (6 là optimal)
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json
    image/svg+xml;
```

### Monitoring Headers

```nginx
# Thêm compression status vào response
add_header X-Compression-Status $gzip_ratio;
```

### Cache Configuration

```nginx
# Cache static assets
location / {
    expires 1d;
    add_header Cache-Control "public, immutable";
}
```

## 📊 Kết quả Demo

### Kích thước File (Ví dụ)

| File | Original | Compressed | Savings | Ratio |
|------|----------|------------|---------|-------|
| index.html | 15.2 KB | 4.1 KB | 73% | 3.7x |
| styles.css | 24.8 KB | 6.2 KB | 75% | 4.0x |
| script.js | 19.5 KB | 7.8 KB | 60% | 2.5x |
| **Total** | **59.5 KB** | **18.1 KB** | **70%** | **3.3x** |

### Performance Impact

- 🚀 **Load Time**: Giảm ~40-60%
- 📊 **Bandwidth**: Tiết kiệm 70%
- 📱 **Mobile**: Cải thiện đáng kể trên 3G/4G

## 🎯 Best Practices

### Nên Compress

✅ **Text files**:
- HTML, CSS, JavaScript
- JSON, XML, SVG
- Fonts (WOFF, WOFF2)

✅ **Thích hợp cho**:
- Files > 1KB
- Text-based content
- High repetition content

### Không nên Compress

❌ **Binary files**:
- Images (JPEG, PNG, GIF)
- Videos (MP4, WebM)
- Audio (MP3, AAC)
- Compressed files (ZIP, RAR)

❌ **Lý do**:
- Đã được compressed
- Overhead lớn hơn benefit
- Tốn CPU resources

### Compression Levels

| Level | CPU Usage | Compression | Use Case |
|-------|-----------|-------------|----------|
| 1-3 | Thấp | Ít | High traffic sites |
| 4-6 | Trung bình | Tốt | **Recommended** |
| 7-9 | Cao | Tối đa | Static content |

### Security Considerations

⚠️ **BREACH Attack**: Tránh compress dynamic content chứa secrets
⚠️ **CRIME Attack**: Cẩn thận với HTTPS + compression

## 🔧 Troubleshooting

### Server không start

```bash
# Check port conflicts
lsof -i :8080

# Check Docker
docker-compose down
docker-compose up -d
```

### Compression không hoạt động

1. **Kiểm tra Accept-Encoding header**:
   ```bash
   curl -H "Accept-Encoding: gzip" -I http://localhost:8080/
   ```

2. **Kiểm tra file size** (files < 1KB không được compress):
   ```bash
   ls -la public/
   ```

3. **Kiểm tra Nginx config**:
   ```bash
   docker-compose exec nginx-compression-demo nginx -t
   ```

### Browser cache issues

- Hard refresh: `Ctrl+F5` (Windows) / `Cmd+Shift+R` (Mac)
- Clear cache hoặc dùng incognito mode

## 📚 Tài liệu tham khảo

- [Nginx Gzip Module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html)
- [Web.dev - Text Compression](https://web.dev/text-compression/)
- [MDN - HTTP Compression](https://developer.mozilla.org/en-US/docs/Web/HTTP/Compression)

## 🎓 Learning Outcomes

Sau khi hoàn thành demo này, bạn sẽ hiểu:

1. ✅ Cách cấu hình Nginx compression
2. ✅ Test và đo lường hiệu quả compression
3. ✅ Best practices cho production
4. ✅ Trade-offs giữa compression level và performance
5. ✅ Security considerations với compression

## 🔄 Next Steps

1. **Thử nghiệm với Brotli compression**
2. **Setup CDN với compression**
3. **Implement trong production**
4. **Monitor compression metrics**

---

## 📝 Commands Cheat Sheet

```bash
# Start demo
docker-compose up -d

# Run tests
./test-compression.sh

# Monitor logs
docker-compose logs -f nginx-compression-demo

# Stop demo
docker-compose down

# Test specific file
curl -H "Accept-Encoding: gzip" \
     -w "%{size_download}" \
     -o /dev/null \
     http://localhost:8080/styles.css
```

**Happy Optimizing! 🚀**
