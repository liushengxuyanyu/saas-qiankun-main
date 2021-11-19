const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  isLogin: state => state.user.isLogin,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  appList: state => state.user.appList,
  userName: state => state.user.userName,
}

export default getters
