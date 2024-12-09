import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    sidebarOpened: false
  },
  reducers: {
    SET_SIDEBAROPENEND: (state, action) => {
      state.sidebarOpened = action.payload
    }
  }
})

const { SET_SIDEBAROPENEND } = appSlice.actions

export { SET_SIDEBAROPENEND }

export default appSlice.reducer
