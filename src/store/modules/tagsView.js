import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const tagsViewSlice = createSlice({
  name: 'tagsView',
  initialState: {
    tagList: []
  },
  reducers: {
    SET_TAGLIST: (state, action) => {
      state.tagList.push(action.payload)

      let arr = state.tagList.filter((item, index) => {
        return state.tagList.indexOf(item) === index
      })

      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i].path == arr[j].path) {
            arr.splice(j, 1)
            j--
          }
        }
      }

      state.tagList = arr
    }
  },
  extraReducers(builder) {
    builder.addCase(
      delTagListAsync.fulfilled, (state, action) => {
        let arr = state.tagList.filter(item => {
          return item.path !== action.payload
        })
        state.tagList = arr
      }
    )
  }
})

const delTagListAsync = createAsyncThunk('delTagListAsync', (path) => {
  return new Promise(resolve => {
    resolve(path)
  })
})

const { SET_TAGLIST } = tagsViewSlice.actions

export { SET_TAGLIST, delTagListAsync }

export default tagsViewSlice.reducer
