import {
  loginByUsername,
  getUserName
} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: [],
    userName: ''
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_APPLIST: (state, list) => {
      state.appList = list;
    },
    SET_USERNAME: (state, name) => {
      state.userName = name;
    },
    SET_CRMREGONID: (state, regionId) => {
      state.crmRegionId = parseInt(regionId);
    },
    SET_PLATFORM: (state, platform) => {
      state.platform = platform;
    },
    SET_COUPON_PLATFORM: (state, couponPlatform) => {
      state.couponPlatform = couponPlatform;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            const data = response.data
            commit('SET_TOKEN', data.token)
            setToken(response.data.token)
            resolve();
          })
          .catch(error => {
            reject(error);
          })
      })
    },

    // 获取用户信息
    GetUserInfo() {},
    // 获取用户有权限访问的ccs项目列表
    getUserName({ commit }) {
      getUserName().then(res => {
        if (res.data.name && res.data.userId) {
          commit('SET_USERNAME', res.data.name)
        } else {
          commit('SET_USERNAME', res.data)
        }
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        } catch (error) {
          reject()
        }
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  }
};

export default user
