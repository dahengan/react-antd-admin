import { lazy, Suspense } from 'react'
import Loading from '@/components/Loading'

// 自定义懒加载函数
export function lazyLoad(factory) {
  const Module = lazy(factory)
  return (
    <Suspense fallback={<Loading />}>
      <Module />
    </Suspense>
  )
}

// 导航菜单遍历
function getItem(item) {
  const hasChildren = item.children && item.children.length > 0
  return {
    key: item.name,
    label: item.meta.title,
    children: hasChildren && !item.hidden ? item.children.map(i => getItem(i)) : ''
  }
}
export function menuTraversal(routes) {
  const list = []
  routes.forEach(route => {
    list.push(getItem(route))
  })
  return list
}
