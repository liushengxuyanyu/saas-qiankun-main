import { login, logout } from "@/api/user"
import { getToken, setToken, removeToken, removeAllCookies } from "@/utils/auth"
import { setLocalStorage, removeLocalStorage, clearAllLocalStorage } from "@/utils/storage"

const state = {
  token: getToken(),
  name: "",
  account: "",
  isLogin: false, // 默认未登录
  appList: Array
}

const mutations = {
  SET_TOKEN: (state: any, token: string) => {
    state.token = token
  },

  SET_NAME: (state: any, name: string) => {
    state.name = name
  },

  SET_ACCOUNT: (state: any, account: string) => {
    state.account = account
  },

  SET_LOGIN_STATUS: (state: any, isLogin: boolean) => {
    // console.log("SET_LOGIN_STATUS: --->", isLogin)
    state.isLogin = isLogin
  }
}

const actions = {
  // 用户登录
  login({ commit }: any, userInfo: object) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((res: any) => {
          console.log("[vuex-login action]", res)
          if (res.result) {
            const { token, username, userAccount } = res.result

            commit("SET_TOKEN", token)
            setToken(token)

            commit("SET_NAME", username)
            setLocalStorage("username", username)

            commit("SET_ACCOUNT", userAccount)
            setLocalStorage("userAccount", userAccount)

            // 根据token确认登录状态
            commit("SET_LOGIN_STATUS", !!token)
            setLocalStorage("isLogin", !!token)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // logout action
  logout({ commit /* state, dispatch */ }: any) {
    return new Promise<void>((resolve, reject) => {
      logout()
        .then(() => {
          commit("SET_TOKEN", "")
          removeToken()
          removeAllCookies()
          // removeLocalStorage("username")
          // removeLocalStorage("isLogin")
          // removeLocalStorage("userAccount")
          clearAllLocalStorage()
          // reset visited views and cached views
          // dispatch('tagsView/delAllViews', null, { root: true })

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
