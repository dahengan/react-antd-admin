import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, removeToken } from '@/utils/auth'
import { checkLocalStorage, setLocalStorage } from '@/utils/storage'
import { login, getInfo } from '@/api/user'
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
          if (checkLocalStorage) {
            setLocalStorage('token', data.data.access_token)
          } else {
            setToken(data.data.access_token)
          }
          setLocalStorage('certificate', 'valid')
        }

        if (data.code === '40317') {
          // 证书过期
          removeToken('token')

          setLocalStorage('certificate', 'invalid')
        }

        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
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
    SET_TOKEN: (state, action) => {
      console.log(action)
    }
  },
  extraReducers(builder) {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      // 保存token
      state.token = action.payload.data.access_token
    })
    builder.addCase(loginAsync.rejected, (state, action) => {
      // console.log(state, action, 'rejected')
    })
  }
})

const { SET_TOKEN } = userSlice.actions

// 按需导出actionCreater
export { SET_TOKEN, loginAsync }

export default userSlice.reducer
