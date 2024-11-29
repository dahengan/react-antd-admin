import axios from 'axios'
import qs from 'qs'
import { store } from '@/store/index'
import { getLocalStorage } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { message } from 'antd'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 300000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getState().user.token) {
      config.headers['Authorization'] = 'Bearer ' + (getLocalStorage('token') || getToken())
    }
    if (config.method === 'get') {
      // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    return config
  },
  error => {
    // for debug
    console.log('request: ', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    const status = response.status
    let url = response.config.url
    let downUrl = RegExp(/fileBusinessDownLoad/)
    const downUrl1 = RegExp(/ptzsExport/)
    let downUrl2 = RegExp(/downloadPic/)
    let downUrl3 = RegExp(/downloadExtFile/)
    // 文件下载单独判断
    if (downUrl.test(url) || downUrl1.test(url) || downUrl2.test(url) || downUrl3.test(url)) {
      return res
    }
    // 登录接口服务请求单独判断(因为返回的数据结构和其他接口不一样)
    if (response.config.url === window.api + '/sso/oauth/token' && status === 200) {
      return response
    }

    // 如果自定义代码不是1，则判断为错误。
    if (res.code !== 1) {
      message.error(res.message)
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    // for debug
    console.log('response: ', error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // debugger
          // 删除令牌，进入登录页面重新登录
          store.dispatch('user/resetToken').then(() => {
            message.error('授权已过期，请重新登录！', 5000)
            setTimeout(() => {
              location.reload()
            }, 800)
          })
          break
        case 500:
          message.error('服务器错误')
          break
        default:
          message.error((error.response.data && error.response.data.message) || '服务器错误')
          break
      }
    }
    return Promise.reject(error)
  }
)

export default service
