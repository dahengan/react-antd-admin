import Layout from '@/Layout/index'
import Auth from './Auth'
import { lazyLoad } from '@/utils/index'

export const constantRoutes = [
  {
    path: '/',
    element: <Layout />,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: '/home',
        name: 'Home',
        element: lazyLoad(() => import('@/views/Home')),
        meta: { title: '首页' },
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

const weightRoutes = (route, parentPath = '') => {
  let reg = new RegExp(/^\//)
  let norouteReg = new RegExp(/^kb-|noroute-/)

  // if (norouteReg.test(route.name)) {
  //   return
  // }
  if (route.component?.name !== 'Layout' && route.component?.name !== 'EmptyLayout') {
    console.log(route, 'route')
  } else {
    if (route.children.length > 0) {
      const path = reg.test(route.path) ? parentPath + route.path : `${parentPath}/${route.path}`
      console.log(route, path, 'else')
    }
  }

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
