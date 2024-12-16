/**
 * 获取localStorage
 * @param name 传入的key
 * @returns {Object}
 */
export function getLocalStorage(name) {
  if (window.localStorage.getItem(name)) {
    try {
      return JSON.parse(window.localStorage.getItem(name))
    } catch (error) {
      return window.localStorage.getItem(name)
    }
  }
}

/**
 * 判断localStorage是否可用
 */
export function checkLocalStorage() {
  localStorage.setItem('canUseLS', 'canUseLS')
  if (localStorage.getItem('canUseLS') != null) {
    localStorage.removeItem('canUseLS')
    return true
  } else {
    return false
  }
}

/**
 * 设置localStorage
 * @param name 传入的key
 * @param data 传入的value
 */
export function setLocalStorage(name, data) {
  if (data) {
    window.localStorage.setItem(name, JSON.stringify(data))
  }
}

/**
 * 设置sessionStorage
 * @param name 传入的key
 * @param data 传入的value
 */
export function setSessionStorage(name, data) {
  if (data) {
    window.sessionStorage.setItem(name, JSON.stringify(data))
  }
}

/**
 * 获取sessionStorage
 * @param name 传入的key
 * @returns {Object}
 */
export function getSessionStorage(name) {
  if (window.sessionStorage.getItem(name)) {
    try {
      return JSON.parse(window.sessionStorage.getItem(name))
    } catch (error) {
      return window.sessionStorage.getItem(name)
    }
  }
}
