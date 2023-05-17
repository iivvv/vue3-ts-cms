import { localCache } from '@/utils/cache'
import hyRequest from '..'
import { LOGIN_TOKEN } from '@/global/constants'

export function accountLogin(account: any) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserById(id: number) {
  return hyRequest.get({
    url: '/users/' + id
    // headers: {
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getRoleMenus(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
