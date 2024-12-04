import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMenu } from '@/api/user'
import { constantRoutes } from '@/routers'

const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    routes: [],
    asyncRoutes: []
  },
  reducers: {
    SET_ROUTES: (state, action) => {}
  },
  extraReducers(builder) {
    builder.addCase(getMenuAsync.fulfilled, (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.routes = constantRoutes.concat(action.payload[i].children)
        state.asyncRoutes = action.payload[i].children
      }
    })
  }
})

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
