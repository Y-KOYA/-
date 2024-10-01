import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import App from '../App.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/money',
      name: 'Money',
      component: () => import('@/views/Money.vue')
    }
  ]
})

export default router
