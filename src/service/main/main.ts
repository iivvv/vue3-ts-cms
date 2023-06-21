import hyRequest from '@/service'

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
