const getters = {

  token: state => state.user.token,
  name: state => state.user.name,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  appList: state => state.user.appList,
  userName: state => state.user.userName,

};
export default getters;
