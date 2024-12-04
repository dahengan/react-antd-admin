import { lazy, Suspense } from 'react'
import Loading from '@/components/Loading'
import Auth from './Auth'
import { Navigate } from 'react-router-dom'

// 自定义懒加载函数
function lazyLoad(factory) {
  const Module = lazy(factory)
  return (
    <Suspense fallback={<Loading />}>
      <Module />
    </Suspense>
  )
}

export const constantRoutes = [
  {
    path: '/',
    element: lazyLoad(() => import('@/Layout')),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        element: lazyLoad(() => import('@/views/Home')),
        meta: { title: '首页' }
      },
      {
        path: '/personal-info',
        name: 'PersonalInfo',
        element: lazyLoad(() => import('@/views/PersonalInfo')),
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    element: lazyLoad(() => import('@/views/Login')),
    meta: { title: '登录' }
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

function treePlatform(data) {
  const hasChildren = data.children && data.children.length > 0
  return {
    path: data.path,
    name: data.name,
    element: authLoad(data.element, data.meta, data.path),
    meta: data.meta,
    children: hasChildren ? data.children.map(i => treePlatform(i)) : []
  }
}

export const transformRoutes = routes => {
  const list = []
  routes.forEach(route => {
    list.push(treePlatform(route))
  })
  return list
}
