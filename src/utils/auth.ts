import Cookies from "js-cookie"

const TOKEN_KEY = "ccs-token"

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const setToken = (token: string) => {
  return Cookies.set(TOKEN_KEY, token)
}

export const removeToken = () => {
  return Cookies.remove(TOKEN_KEY, { path: "/" })
}

// 验证菜单栏路径是否匹配
export const matchPath = (path: string, currentPath: string) => {
  let reg = new RegExp(path.replace("&", "\\&").replace("?", "\\?"))
  return path && reg.test(currentPath)
}

// const authKey = "auth-user"

// function getAuthUser() {
//   return JSON.parse(localStorage.getItem(authKey))
// }

// export function setAuthUser(authUser) {
//   return localStorage.setItem(authKey, JSON.stringify(authUser))
// }

// export function removeAuthUser() {
//   return localStorage.removeItem(authKey)
// }

// export function checkAndGetAuthUser(token) {
//   const authUser = getAuthUser()
//   if (
//     authUser &&
//     authUser.token === token &&
//     new Date().getTime() - authUser.timestamp < 60 * 10 * 1000
//   ) {
//     return authUser
//   }
//   removeAuthUser()
//   return null
// }

// export function updateAuthUser(obj) {
//   return localStorage.setItem(
//     authKey,
//     JSON.stringify(Object.assign({}, getAuthUser(), obj))
//   )
// }

// export function logout() {
//   MessageBox.confirm(
//     "用户信息获取有误，可以取消继续留在该页面，或者重新登录",
//     "确定登出", {
//     confirmButtonText: "重新登录",
//     cancelButtonText: "取消",
//     type: "warning"
//   }
//   ).then(() => {
//     let url = `${window.location.origin}/ccs/login?ret=${encodeURIComponent(location.href)}`
//     window.location.replace(url)
//   })
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey, {
//     path: "/"
//   })
// }