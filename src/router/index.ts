import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/catalog.vue')
  },
  {
  path: '/checkout',
  name: 'Checkout',
  component: () => import('../views/CheckoutPage.vue')
},
{
  path: '/order-success',
  name: 'OrderSuccess',
  component: () => import('../views/OrderSuccessPage.vue')
},
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/cart.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router