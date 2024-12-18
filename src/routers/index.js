import Auth from './Auth'
import { lazyLoad, isExternal } from '@/utils/index'

export const constantRoutes = [
  {
    path: '/',
    element: lazyLoad(() => import('@/Layout/index')),
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: '/home',
        name: 'Home',
        element: lazyLoad(() => import('@/views/Home')),
        meta: { title: '首页', affix: true },
        hidden: true
      },
      {
        path: '/personal-info',
        name: 'PersonalInfo',
        element: lazyLoad(() => import('@/views/PersonalInfo')),
        meta: { title: '个人中心' },
        hidden: true
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    element: lazyLoad(() => import('@/views/Login')),
    meta: { title: '登录' },
    children: [],
    hidden: true
  }
]

// 路由配置列表数据转换
const authLoad = (element, meta = {}, path = '') => {
  return (
    <Auth meta={meta} path={path}>
      {element}
    </Auth>
  )
}

const weightRoutes = route => {
  const hasChildren = route.children && route.children.length > 0
  return {
    path: route.path,
    name: route.name,
    redirect: route.redirect,
    element: authLoad(route.element, route.meta, route.path),
    meta: route.meta,
    children: hasChildren ? route.children.map(i => weightRoutes(i)) : []
  }
}

export const transformRoutes = routes => {
  const list = []
  routes.forEach(route => {
    list.push(weightRoutes(route))
  })
  return list
}

const transRoute = (route, parentPath = '') => {
  let reg = new RegExp(/^\//)
  const hasChildren = route.children && route.children.length > 0

  if (route.path === '/') {
    return route
  }

  if (route.element?.type?.name !== 'Layout' && route.element?.type?.name !== 'Empty') {
    const reactMode = route.meta?.reactMode || 1
    const path =
      isExternal(route.path) || reactMode === '5'
        ? route.path
        : reg.test(route.path)
        ? route.path
        : `${parentPath}/${route.path}`

    return {
      path: path,
      name: route.name,
      redirect: route.redirect,
      element: route.element,
      meta: route.meta
    }
  } else {
    if (hasChildren) {
      const path = reg.test(route.path) ? parentPath + route.path : `${parentPath}/${route.path}`

      return {
        path: path,
        name: route.name,
        redirect: route.redirect,
        element: route.element,
        meta: route.meta,
        children: hasChildren ? route.children.map(i => transRoute(i, path)) : []
      }
    }
  }
}

export const addRoutes = accessRoutes => {
  const list = []
  accessRoutes.forEach(route => {
    list.push(transRoute(route))
  })
  return list
}
