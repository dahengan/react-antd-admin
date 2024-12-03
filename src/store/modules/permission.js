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
    SET_ROUTES: (state, action) => {
      console.log(action)
    }
  },
  extraReducers(builder) {
    builder.addCase(getMenuAsync.fulfilled, (state, action) => {
      state.routes = constantRoutes.concat(action.payload)
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
        for (let i = 0; i < data.length; i++) {
          console.log(data)
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
