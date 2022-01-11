const getters = {
  token: (state: any) => state.user.token,
  name: (state: any) => state.user.name,
  isLogin: (state: any) => state.user.isLogin,
  status: (state: any) => state.user.status,
  roles: (state: any) => state.user.roles,
  setting: (state: any) => state.user.setting,
  appList: (state: any) => state.user.appList,
  userName: (state: any) => state.user.userName,
  account: (state: any) => state.user.account
}

export default getters
