import { lazy, Suspense } from 'react'
import Loading from '@/components/Loading'

// 自定义懒加载函数
function lazyLoad(factory) {
  const Module = lazy(factory)
  return (
    <Suspense fallback={<Loading />}>
      <Module />
    </Suspense>
  )
}

export const routes = [
  {
    path: '/',
    element: lazyLoad(() => import('@/Layout')),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: lazyLoad(() => import('@/views/Home')),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    element: lazyLoad(() => import('@/views/Login'))
  }
]
