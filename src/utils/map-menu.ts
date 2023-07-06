import type { RouteRecordRaw } from 'vue-router'

// export let firstRoute: RouteRecordRaw | undefined = undefined

// 加载所有路由对象
function loadLocalRoutes() {
  // 1.加载所有的模板
  const modules: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )
  // 2.遍历所有的模板为路由对象
  const routes: RouteRecordRaw[] = []
  for (const key in modules) {
    const route = modules[key].default
    routes.push(route)
  }
  return routes
}

// 动态路由：映射菜单到路由
export let firstMenu: any = null
export function mapMenuToRoutes(menus: any[]) {
  // 1.加载所有的路由对象
  const localRoutes = loadLocalRoutes()
  // console.log(localRoutes)
  // console.log(menus)

  // 2.根据菜单匹配路由
  const finalRoutes: RouteRecordRaw[] = []
  for (const menu of menus) {
    for (const submenu of menu.children) {
      const menuUrl = submenu.url
      const route = localRoutes.find((item) => item.path === menuUrl)
      if (route) {
        finalRoutes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  // console.log(finalRoutes)

  // // 3.不确定有几层
  // const finalRoutes: RouteRecordRaw[] = []
  // function _recurseGetRoute(menus: any[]) {
  //   for (const menu of menus) {
  //     if (menu.type === 2) {
  //       const route = localRoutes.find((item) => item.path === menu.url)
  //       if (route) finalRoutes.push(route)
  //       if (!firstRoute && route) firstRoute = route
  //     } else {
  //       if (menu.type === 1 && menu.children.length) {
  //         finalRoutes.push({ path: menu.url, redirect: menu.children[0].url })
  //       }
  //       _recurseGetRoute(menu.children ?? [])
  //     }
  //   }
  // }
  // _recurseGetRoute(menus)

  return finalRoutes
}

//根据路径去匹配需要高亮显示的菜单
export function mapPathToMenu(menus: any[], path: string) {
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) return submenu
    }
  }
}

//路径to面包屑
export function mapPathToBreadcrumbs(menus: any[], path: string) {
  const breadcrumbs: any[] = []
  // console.log(path)
  // console.log(menus)
  // 1.两层遍历
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        // breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: menu.name })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
        // console.log(breadcrumbs)
      }
    }
  }

  // console.log(breadcrumbs)
  return breadcrumbs
}

//菜单映射到 id 列表 ，递归
export function mapMenuToIds(menus: any[]) {
  const ids: number[] = []
  function _recurseGetId(menusList: any[]) {
    for (const menu of menusList) {
      if (menu.children) {
        _recurseGetId(menu.children)
      } else {
        ids.push(menu.id)
      }
    }
  }
  _recurseGetId(menus)
  return ids
}

//映射菜单 to 权限
export function mapMenuToPermissions(menus: any[]) {
  const permissions: string[] = []
  function _recurseGetPermission(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(menus)
  return permissions
}
