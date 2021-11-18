import Cookies from "js-cookie"

const TokenKey = "ccs-token"

const authKey = "auth-user"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

function getAuthUser() {
  return JSON.parse(localStorage.getItem(authKey))
}

export function setAuthUser(authUser) {
  return localStorage.setItem(authKey, JSON.stringify(authUser))
}

export function removeAuthUser() {
  return localStorage.removeItem(authKey)
}

export function checkAndGetAuthUser(token) {
  const authUser = getAuthUser()
  if (
    authUser &&
    authUser.token === token &&
    new Date().getTime() - authUser.timestamp < 60 * 10 * 1000
  ) {
    return authUser
  }
  removeAuthUser()
  return null
}

export function updateAuthUser(obj) {
  return localStorage.setItem(
    authKey,
    JSON.stringify(Object.assign({}, getAuthUser(), obj))
  )
}

export function logout() {
  MessageBox.confirm(
    "用户信息获取有误，可以取消继续留在该页面，或者重新登录",
    "确定登出", {
    confirmButtonText: "重新登录",
    cancelButtonText: "取消",
    type: "warning"
  }
  ).then(() => {
    let url = `${window.location.origin}/ccs/login?ret=${encodeURIComponent(location.href)}`
    window.location.replace(url)
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey, {
    path: "/"
  })
}