<template>
  <div class="product">
    <div class="page-header">
      <h1>Trang Sản phẩm</h1>
      <p>Đây là trang sản phẩm được tải bằng lazy loading thông qua Vue Router</p>
    </div>

    <div class="product-actions">
      <button @click="loadProductModal" class="btn btn-primary">
        Thêm sản phẩm mới (Lazy Component)
      </button>
      <router-link to="/" class="btn btn-secondary">
        Quay về trang chủ
      </router-link>
    </div>

    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
          <div class="placeholder-image">📱</div>
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="product-price">{{ formatPrice(product.price) }}</p>
          <p class="product-description">{{ product.description }}</p>
          <button class="btn btn-sm btn-outline">Xem chi tiết</button>
        </div>
      </div>
    </div>

    <!-- Code splitting component -->
    <ProductModal 
      v-if="showModal" 
      @close="closeProductModal"
      @add-product="addProduct"
    />

  </div>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue';
// import ProductModal from '@/components/ProductModal.vue';
const ProductModal = defineAsyncComponent(() => import('@/components/ProductModal.vue'));

export default {
  name: 'Product',
  components: {
    ProductModal
  },
  setup() {
    const showModal = ref(false)
    debugger
    console.log('🚀 Đang khởi tạo component Product...')
    const products = ref([
      {
        id: 1,
        name: 'iPhone 15 Pro',
        price: 25000000,
        description: 'Điện thoại thông minh cao cấp với chip A17 Pro'
      },
      {
        id: 2,
        name: 'Samsung Galaxy S24',
        price: 22000000,
        description: 'Flagship Android với AI tích hợp'
      },
      {
        id: 3,
        name: 'Google Pixel 8',
        price: 18000000,
        description: 'Trải nghiệm Android thuần túy với camera AI'
      },
      {
        id: 4,
        name: 'OnePlus 12',
        price: 20000000,
        description: 'Performance flagship với sạc nhanh'
      }
    ])

    const loadProductModal = () => {
      console.log('🚀 Đang tải component ProductModal...')
      // Hiển thị modal - component sẽ được lazy load tự động
      showModal.value = true
    }

    const closeProductModal = () => {
      showModal.value = false
    }

    const addProduct = (newProduct) => {
      const id = Math.max(...products.value.map(p => p.id)) + 1
      products.value.push({
        id,
        ...newProduct
      })
      closeProductModal()
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    }

    return {
      products,
      showModal,
      loadProductModal,
      closeProductModal,
      addProduct,
      formatPrice
    }
  }
}
</script>

<style scoped>
.product {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-header h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

.product-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 200px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image {
  font-size: 4rem;
  opacity: 0.6;
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
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
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-outline {
  background: transparent;
  border: 1px solid #42b883;
  color: #42b883;
}

.btn-outline:hover {
  background: #42b883;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.loading-modal .spinner {
  margin: 0 auto 1rem;
}

.error {
  color: #e74c3c;
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  margin: 2rem;
}
</style>
