import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // Lazy loading - Code splitting cho route Home
    component: () => import('../views/Home.vue')
  },
  {
    path: '/product',
    name: 'Product',
    // Lazy loading - Code splitting cho route Product
    component: () => import('../views/Product.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
