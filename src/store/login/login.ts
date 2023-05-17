import router from '@/router'
import { accountLogin, getUserById, getRoleMenus } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  // 省略了很多，可以用工具网站根据后端返回内容生成完整类型
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  // 箭头函数指定返回值类型为ILoginState
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 1.获取登录信息
      const loginRes = await accountLogin(account)
      // console.log(loginRes)
      const { userId, token } = loginRes.data
      this.token = token

      // // 2.保存在cache中
      localCache.setCache(LOGIN_TOKEN, token)
      console.log('token已保存')

      // 3.获取用户信息
      const userRes = await getUserById(userId)
      this.userInfo = userRes.data
      localCache.setCache('useInfo', this.userInfo)

      // 4.根据role的id获取菜单
      const roleId = this.userInfo.role.id
      const menuRes = await getRoleMenus(roleId)
      this.userMenus = menuRes.data
      localCache.setCache('userMenus', this.userMenus)

      // 跳转到首页
      router.push('/main')
    },

    loadLocalDataAction() {
      this.token = localCache.getCache(LOGIN_TOKEN)
      this.userInfo = localCache.getCache('userInfo')
      this.userMenus = localCache.getCache('userMenus')
      // if (token && userInfo && userMenus) {
      //   this.token = token
      //   this.userInfo = userInfo
      //   this.userMenus = userMenus

      //   // 2.动态添加路由
      //   const routes = mapMenusToRoutes(userMenus)
      //   routes.forEach((route) => router.addRoute('main', route))
      // }
      console.log('------')
    }
  }
})

export default useLoginStore
