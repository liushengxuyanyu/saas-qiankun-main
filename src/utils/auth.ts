import Cookies from "js-cookie"

const TOKEN_KEY = "ccs-token"

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const setToken = (token: string) => {
  const tokenStr = getToken()
  if (tokenStr) {
    console.log("🚔 服务端已经种cookie信息了， 什么也不做，防止重复设置ccs-token")
  } else {
    Cookies.set(TOKEN_KEY, token)
  }
}

export const removeToken = () => {
  // console.log("remove token in cookie")
  return Cookies.remove(TOKEN_KEY, { path: "/" })
}

// 验证菜单栏路径是否匹配
export const matchPath = (path: string, currentPath: string) => {
  let reg = new RegExp(path.replace("&", "\\&").replace("?", "\\?"))
  return path && reg.test(currentPath)
}

export const removeAllCookies = () => {
  const cookies = Cookies.get()
  console.log("cookies: --->", cookies)
}
