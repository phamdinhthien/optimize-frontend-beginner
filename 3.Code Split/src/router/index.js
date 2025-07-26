import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: import('@/views/Home.vue')
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/product',
    name: 'Product',
    // component: import('@/views/Product.vue')
    component: () => import('@/views/Product.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
