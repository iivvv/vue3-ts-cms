import hyRequest from '@/service'

// 用户列表-请求数据
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
//用户列表-删除（伪
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

//用户列表-编辑（伪
export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: '/users/' + id,
    data: userInfo
  })
}

//用户列表-新建（伪
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

// 获取部门的信息
export function getDepartmentData(queryInfo: any) {
  return hyRequest.post({
    url: '/department/list',
    data: queryInfo
  })
}

// 获取角色的信息
export function getRoleData(queryInfo: any) {
  return hyRequest.post({
    url: '/role/list',
    data: queryInfo
  })
}

// 获取菜单的信息
export function getMenuData() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
