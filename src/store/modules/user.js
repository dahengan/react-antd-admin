import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
import JSEncrypt from 'jsencrypt'

// user login
const loginAsync = createAsyncThunk('loginAsync', userInfo => {
  const { username, password, captcha, captchaId } = userInfo

  return new Promise((resolve, reject) => {
    // 加密
    var publicKey =
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbj3V1MC7zFGnyPWDcv/55nQRklXB1KyZ7mpglV2SiCoDcWqArAEUjfp5iHQT59Wfyg+56fBnKV0nuvBEXRICytaZuGFiQYeDqEkuR5mkSIEnvcld+TgHAbeXRAIry8LE59efeJcyqQoCDG2sA8pMgEqVNhfP/hDb5+uH0QAvLWQIDAQAB'
    // eslint-disable-next-line no-undef
    var encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    const encryptPassword = encrypt.encrypt(password)
    const params = {
      grant_type: 'password',
      username: username,
      password: encryptPassword,
      captcha: captcha.trim(),
      captchaId: captchaId
    }
    login(params)
      .then(response => {
        const data = response
        if (data.code === 1) {
          setToken(data.data.access_token)
        }
        if (data.code === '40317') {
          // 证书过期
          removeToken('token')
        }
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
})

// user reset
const resetTokenAsync = createAsyncThunk('resetTokenAsync', () => {
  return new Promise(resolve => {
    // 清除所有localStorage
    window.localStorage.clear()
    // 清除token
    removeToken()

    resolve()
  })
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    userInfo: {},
    certivalid: true
  },
  reducers: {
    SET_TOKEN: (state, action) => {}
  },
  extraReducers(builder) {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      // 保存token
      state.token = action.payload.data.access_token
    })
    builder.addCase(resetTokenAsync.fulfilled, (state, action) => {
      // 清除token
      state.token = ''
    })
  }
})

const { SET_TOKEN } = userSlice.actions

// 按需导出actionCreater
export { SET_TOKEN, loginAsync, resetTokenAsync }

export default userSlice.reducer
