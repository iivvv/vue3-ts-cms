import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu, mapMenuToRoutes } from '@/utils/map-menu'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
      // ,children: [
      //   {
      //     path: '/main/analysis/overview',
      //     component: () => import('@/views/main/analysis/overview/overview.vue')
      //   }
      // ]
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('@/views/notFound/not-found.vue')
    }
  ]
})

export function addRoutesWithMenu(menus: any) {
  // 1.获取匹配到的所有的路由
  const routes = mapMenuToRoutes(menus)

  // 2.动态添加到router中
  for (const route of routes) {
    router.addRoute('main', route)
    console.log(route)
  }
}

// 导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  // 如果是进入到main
  if (to.path === '/main' || to.path === '/main/') {
    return firstMenu?.url
  }
})

export default router
