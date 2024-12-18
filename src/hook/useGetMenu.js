import routesMap from '@/routers/routesMap'
import { constantRoutes } from '@/routers'

export default function (asyncRoutes) {
  if (!asyncRoutes) {
    return constantRoutes
  }

  const list = []
  const weightRoutes = route => {
    const hasChildren = route.children && route.children.length > 0
    return {
      path: route.path,
      name: route.name,
      redirect: route.redirect,
      element: routesMap[route.component],
      meta: route.meta,
      children: hasChildren ? route.children.map(i => weightRoutes(i)) : []
    }
  }
  asyncRoutes.forEach(item => {
    list.push(weightRoutes(item))
  })
  const initRoutesList = constantRoutes.concat(list)
  return initRoutesList

}
