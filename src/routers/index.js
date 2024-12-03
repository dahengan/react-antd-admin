import { lazy, Suspense } from 'react'
import Loading from '@/components/Loading'
import Auth from './Auth'
import { Navigate } from 'react-router-dom'

// 自定义懒加载函数
function lazyLoad(factory) {
  const Module = lazy(factory)
  return (
    <Auth>
      <Suspense fallback={<Loading />}>
        <Module />
      </Suspense>
    </Auth>
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
        hidden: true,
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

const authLoad = (element, meta = {}, path = '') => {
  return (
    <Auth meta={meta} path={path}>
      {element}
    </Auth>
  )
}

// 路由配置列表数据转换
export const transformRoutes = routes => {
  const list = []
  routes.forEach(route => {
    const obj = { ...route }
    if (obj.redirect) {
      obj.element = <Navigate to={obj.redirect} replace={true} />
    }

    if (obj.element) {
      obj.element = authLoad(obj.element, obj.meta, obj.path)
    }

    delete obj.redirect
    delete obj.meta

    if (obj.children) {
      obj.children = transformRoutes(obj.children)
    }
    list.push(obj)
  })
  return list
}
