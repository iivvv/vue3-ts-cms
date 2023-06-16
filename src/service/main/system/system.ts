import hyRequest from '@/service'

// 用户列表的网络请求
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

//  {
//   offset: 0,
//   size: 10
// }
