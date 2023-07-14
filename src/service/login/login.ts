// import { localCache } from '@/utils/cache'
import hyRequest from '..'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

export function accountLogin(account: any) {
  return hyRequest.post({
    url: '/users/login',
    data: account
  })
}

export function getUserById(id: number) {
  return hyRequest.get({
    url: '/users/' + id,
    headers: {
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getRoleMenus(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
