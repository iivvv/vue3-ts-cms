import router from '@/router'
import { accountLogin } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}
const LOGIN_TOKEN = 'login/token'

const useLoginStore = defineStore('login', {
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
      const { userId, token } = loginRes.data.userInfo
      this.token = token

      // // 2.保存在cache中
      localCache.setCache(LOGIN_TOKEN, token)
      // console.log('token已保存')

      // // 3.获取用户信息
      // const userRes = await getUserById(id)
      // this.userInfo = userRes.data
      // localCache.setCache('useInfo', this.userInfo)

      // // 4.根据role的id获取菜单
      // const roleId = this.userInfo.role.id
      // const menuRes = await getRoleMenus(roleId)
      // this.userMenus = menuRes.data
      // localCache.setCache('userMenus', this.userMenus)

      // // 跳转到首页
      // router.push('/main')
    }

    // loadLocalDataAction() {
    //   this.token = localCache.getCache('token')
    //   this.userInfo = localCache.getCache('userInfo')
    //   this.userMenus = localCache.getCache('userMenus')
    //   console.log('------')
    // }
  }
})

export default useLoginStore
