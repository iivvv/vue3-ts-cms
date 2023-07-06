import router from '@/router'
import { accountLogin, getUserById, getRoleMenus } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { LOGIN_TOKEN } from '@/global/constants'
import type { RouteRecordRaw } from 'vue-router'
import { mapMenuToRoutes, mapMenuToPermissions } from '@/utils/map-menu'
import useMainStore from '../main/main'

interface ILoginState {
  // 省略了很多，可以用工具网站根据后端返回内容生成完整类型
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 箭头函数指定返回值类型为ILoginState
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? [],
    permissions: localCache.getCache('permissions') ?? []
  }),
  actions: {
    // 点击登录按钮时执行
    async accountLoginAction(account: IAccount) {
      // 1.获取登录信息
      const loginRes = await accountLogin(account)
      // console.log(loginRes)
      const { userId, token } = loginRes.data
      this.token = token

      // // 2.保存在cache中
      localCache.setCache(LOGIN_TOKEN, token)

      // 3.获取用户信息
      const userRes = await getUserById(userId)
      this.userInfo = userRes.data
      localCache.setCache('userInfo', this.userInfo)

      // 4.根据role的id获取菜单
      const roleId = this.userInfo.role.id
      const menuRes = await getRoleMenus(roleId)
      const userMenus = menuRes.data
      this.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)

      //用户页面需要获取部门和角色数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //获取登录用户的权限
      const permissions = mapMenuToPermissions(userMenus)
      this.permissions = permissions
      localCache.setCache('permissions', permissions)
      console.log(permissions)

      // 5.动态路由实现：
      // // ——————————————封装成函数
      // // 5.1先获取所有路由，暂存
      // const localRoutes: RouteRecordRaw[] = []
      // const modules: Record<string, any> = import.meta.glob(
      //   //vite导入匹配路径得到的模块
      //   '../../router/main/**/*.ts',
      //   {
      //     eager: true //不需要按需引入懒加载
      //   }
      // )
      // for (const key in modules) {
      //   const module = modules[key]
      //   localRoutes.push(module.default)
      // }
      // // 5.2根据菜单匹配正确的路由，并配置到route里 //failed
      // for (const menu of userMenus) {
      //   for (const submenu of menu.children) {
      //     const route = localRoutes.find((item) => item.path === submenu.url)
      //     if (route) router.addRoute('main', route)
      //   }
      // }
      // // ——————————————封装成函数
      const routes = mapMenuToRoutes(this.userMenus)
      // console.log(routes)
      routes.forEach((route) => router.addRoute('main', route))

      // 跳转到首页
      router.push('/main')
    },

    // 刷新时重新加载数据!!!
    loadLocalDataAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')

      if (token && userInfo && userMenus) {
        // console.log('333')
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //刷新时需要重新获取部门和角色数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2.动态添加路由
        const routes = mapMenuToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
