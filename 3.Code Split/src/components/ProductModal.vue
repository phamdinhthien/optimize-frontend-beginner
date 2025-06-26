<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Thêm sản phẩm mới</h2>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="code-split-info">
          <div class="info-badge">
            📦 Component này được tải bằng lazy loading!
          </div>
          <p class="info-text">
            Mở DevTools > Network để xem chunk riêng biệt được tải khi component này xuất hiện.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="product-form">
          <div class="form-group">
            <label for="name">Tên sản phẩm:</label>
            <input 
              id="name"
              v-model="form.name" 
              type="text" 
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>

          <div class="form-group">
            <label for="price">Giá (VNĐ):</label>
            <input 
              id="price"
              v-model.number="form.price" 
              type="number" 
              placeholder="Nhập giá sản phẩm"
              min="0"
              step="1000"
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Mô tả:</label>
            <textarea 
              id="description"
              v-model="form.description" 
              placeholder="Nhập mô tả sản phẩm"
              rows="4"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="category">Danh mục:</label>
            <select id="category" v-model="form.category" required>
              <option value="">Chọn danh mục</option>
              <option value="phone">Điện thoại</option>
              <option value="laptop">Laptop</option>
              <option value="tablet">Tablet</option>
              <option value="accessory">Phụ kiện</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              Hủy
            </button>
            <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'ProductModal',
  emits: ['close', 'add-product'],
  setup(props, { emit }) {
    const form = ref({
      name: '',
      price: 0,
      description: '',
      category: ''
    })

    const isFormValid = computed(() => {
      return form.value.name.trim() && 
             form.value.price > 0 && 
             form.value.description.trim() && 
             form.value.category
    })

    const closeModal = () => {
      emit('close')
    }

    const handleSubmit = () => {
      if (isFormValid.value) {
        emit('add-product', { ...form.value })
        // Reset form
        form.value = {
          name: '',
          price: 0,
          description: '',
          category: ''
        }
      }
    }

    onMounted(() => {
      // Log để thấy component đã được tải
      console.log('🚀 ProductModal component đã được lazy load thành công!')
      
      // Focus vào input đầu tiên
      const firstInput = document.querySelector('#name')
      if (firstInput) {
        firstInput.focus()
      }
    })

    return {
      form,
      isFormValid,
      closeModal,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #f8f9fa;
  color: #e74c3c;
}

.modal-body {
  padding: 2rem;
}

.code-split-info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.info-badge {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.info-text {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #369870;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .modal-header,
  .modal-body {
    padding: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
