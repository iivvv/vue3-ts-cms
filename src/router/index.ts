import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('@/views/notFound/not-found.vue')
    }
  ]
})

export default router
