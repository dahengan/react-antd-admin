import request from '@/utils/request'
import qs from 'qs'
import { sso, oam } from './config'
const fixedCharator = 'armo:armo_secret'
const authString = 'Basic ' + window.btoa(fixedCharator)

// 登录
export function login(data) {
  return request({
    url: sso + '/oauth/token',
    method: 'post',
    headers: {
      Authorization: authString
    },
    data: qs.stringify(data)
  })
}

// 获取验证码ID
export function getCaptchaId() {
  return request({
    url: `${sso}/captcha/id`,
    method: 'get'
  })
}
