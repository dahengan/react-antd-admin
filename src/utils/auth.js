import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  window.token = Cookies.get(TokenKey)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
