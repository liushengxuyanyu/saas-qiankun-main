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
export function clearLocalStorage() {
  window.localStorage.clear()
}
