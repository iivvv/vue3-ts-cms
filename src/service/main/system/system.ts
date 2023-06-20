import hyRequest from '@/service'

// 用户列表的网络请求
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
//用户列表-删除数据
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
//  {
//   offset: 0,
//   size: 10
// }

//新建（伪
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}
/** 获取部门的信息 */
export function getDepartmentData(queryInfo: any) {
  return hyRequest.post({
    url: '/department/list',
    data: queryInfo
  })
}

/** 获取角色的信息 */
export function getRoleData(queryInfo: any) {
  return hyRequest.post({
    url: '/role/list',
    data: queryInfo
  })
}

/** 获取菜单的信息 */
export function getMenuData() {
  return hyRequest.post({
    url: '/menu/list'
  })
}