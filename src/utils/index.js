import { lazy, Suspense } from 'react'
import Loading from '@/components/Loading'
import { getLocalStorage } from '@/utils/storage'
import { constantRoutes } from '@/routers'

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
function getItem(item, parentPath = '') {
  let reg = new RegExp(/^\//)
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren) {
    const path = reg.test(item.path) ? parentPath + item.path : `${parentPath}/${item.path}`
    return {
      key: path,
      label: item.meta.title,
      meta: item.meta,
      children: hasChildren && !item.hidden ? item.children.map(i => getItem(i, path)) : ''
    }
  } else {
    const reactMode = item.meta?.reactMode || 1
    const path =
      isExternal(item.path) || reactMode === '5'
        ? item.path
        : reg.test(item.path)
        ? item.path
        : `${parentPath}/${item.path}`

    return {
      key: path,
      label: item.meta.title,
      meta: item.meta
    }
  }
}
export function menuTraversal(routes) {
  const list = []
  routes.forEach(route => {
    list.push(getItem(route))
  })
  return list
}

export function isExternal(path) {
  return /^(https?:|http?:|mailto:|tel:)/.test(path)
}

function transRouter(route, parentPath = '') {
  if (!route) {
    return {
      path: '',
      name: '',
      element: '',
      meta: { },
      children: []
    }
  }
  
  let reg = new RegExp(/^\//)
  const hasChildren = route.children && route.children.length > 0

  if (route.path === '/') {
    return route
  }

  if (hasChildren) {
    const path = reg.test(route.path) ? parentPath + route.path : `${parentPath}/${route.path}`

    return {
      path: path,
      name: route.name,
      redirect: route.redirect,
      element: route.element,
      meta: route.meta,
      children: hasChildren ? route.children.map(i => transRouter(i, path)) : []
    }
  } else {
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
  }
}

const traverse = (arr, key) => {
  return arr.map(item => {
    if (item.path === key) {
      return item
    } else {
      if (item.children && item.children.length > 0) {
        item.children = traverse(item.children, key)
      }
      return 'item'
    }
    })
}

export function getRouteDetail(key) {
  const initRoutesList = constantRoutes.concat(getLocalStorage('initRoutesList'))
  const list = []
  initRoutesList.forEach(route => {
    list.push(transRouter(route))
  })

  let routerTitle = ''
  
  let traverse = function (array, key) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].path === key) {
        routerTitle = array[i].meta.title
      } else {
        if (array[i].children && array[i].children.length > 0) {
          traverse(array[i].children, key)
        }
      }
    }
  }

  traverse(list, key)

  return routerTitle
}
