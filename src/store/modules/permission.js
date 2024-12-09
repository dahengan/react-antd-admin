import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMenu } from '@/api/user'
import { constantRoutes } from '@/routers'
import routesMap from '@/routers/routesMap'
import { menuTraversal } from '@/utils/index'

const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    routes: [],
    menuList: [],
    asyncRoutes: []
  },
  reducers: {
    SET_ROUTES: (state, action) => {}
  },
  extraReducers(builder) {
    builder.addCase(getMenuAsync.fulfilled, (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.asyncRoutes = action.payload[i].children
        state.routes = constantRoutes.concat(replaceRoutesComponent(action.payload[i].children))

        state.menuList = menuTraversal(action.payload[i].children)
      }
    })
  }
})

/**
 * @param asyncRoutes 获取的动态路由数据
 * @param routesMap 本地路由component映射表
 */
const replaceRoutesComponent = asyncRoutes => {
  const list = []
  asyncRoutes.forEach(item => {
    list.push(weightRoutes(item))
  })
  return list
}
// 遍历处理路由
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

// 异步
const getMenuAsync = createAsyncThunk('getMenuAsync', () => {
  return new Promise((resolve, reject) => {
    getMenu({ scope: 'GLOBAL' })
      .then(response => {
        const data = response.data
        if (!data) {
          reject('验证失败，请重新登录。')
        }
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
})

export { getMenuAsync }
export default permissionSlice.reducer
