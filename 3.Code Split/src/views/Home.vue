<template>
  <div class="home">
    <div class="hero">
      <h1>Chào mừng đến với Vue3 Code Split Demo</h1>
      <p class="hero-text">
        Đây là trang chủ được tải bằng lazy loading. 
        Mở DevTools > Network để xem các chunk được tải riêng biệt.
      </p>
    </div>

    <div class="features">
      <h2>Tính năng Code Splitting</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <h3>🚀 Router Code Split</h3>
          <p>Các route được tải riêng biệt khi người dùng truy cập</p>
        </div>
        <div class="feature-card">
          <h3>📦 Component Code Split</h3>
          <p>Component được tải async khi cần thiết</p>
        </div>
        <div class="feature-card">
          <h3>⚡ Tăng Performance</h3>
          <p>Giảm thời gian tải trang ban đầu</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>Demo Code Splitting</h2>
      <div class="demo-actions">
        <router-link to="/product" class="btn btn-primary">
          Đi đến trang Sản phẩm (Route Code Split)
        </router-link>
        <button @click="showModal" class="btn btn-secondary">
          Mở Popup Thêm Sản phẩm (Component Code Split)
        </button>
      </div>
    </div>

    <!-- Async Component sẽ được render ở đây -->
    <component 
      v-if="modalComponent" 
      :is="modalComponent" 
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'

export default {
  name: 'Home',
  setup() {
    const modalComponent = ref(null)

    const showModal = async () => {
      // Lazy loading component - chỉ tải khi cần
      modalComponent.value = defineAsyncComponent({
        loader: () => import('../components/ProductModal.vue'),
        loadingComponent: {
          template: `
            <div class="loading">
              <div class="spinner"></div>
              Đang tải popup...
            </div>
          `
        },
        errorComponent: {
          template: '<div>Lỗi khi tải popup</div>'
        },
        delay: 200,
        timeout: 3000
      })
    }

    const closeModal = () => {
      modalComponent.value = null
    }

    return {
      modalComponent,
      showModal,
      closeModal
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-text {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.features {
  margin-bottom: 4rem;
}

.features h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.demo-section {
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.demo-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover {
  background: #369870;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #e74c3c;
  color: white;
}

.btn-secondary:hover {
  background: #c0392b;
  transform: translateY(-2px);
}
</style>
