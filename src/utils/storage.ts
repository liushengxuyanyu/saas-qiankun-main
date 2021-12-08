/**
 * 检查localStorage中是否有指定的值
 * @param {*} key
 */
export function getLocalStorage(key: string) {
  return window.localStorage.getItem(key)
}

/**
 * 将数据存储到localStorage中
 * @param {*} key
 * @param {*} data
 */
export function setLocalStorage(key: string, data: any) {
  window.localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 从localStorage中移除指定的key值
 * @param {*} key
 */
export function removeLocalStorage(key: string) {
  window.localStorage.removeItem(key)
}

/**
 * 移除localSotrage中的所有数据信息
 */
export function clearAllLocalStorage() {
  window.localStorage.clear()
}

/**
 * 获取session数据
 * @param key
 * @returns
 */
export function getSessionStorage(key: string) {
  return window.sessionStorage.getItem(key)
}

export function setSessionStorage(key: string, data: any) {
  return window.sessionStorage.setItem(key, JSON.stringify(data))
}

export function removeSessionStorage(key: string) {
  window.sessionStorage.removeItem(key)
}

export function clearSessionStorage() {
  window.sessionStorage.clear()
}
