const state = {
  belongTo: "", // 设置路由地址是否属于主框架, 默认不属于
  showHeader: true, // 显示 ｜ 隐藏顶部导航栏
  showDownload: true, // 显示 ｜ 隐藏顶部右侧下载按钮
  showSidebar: true, // 显示 ｜ 隐藏侧边栏
  showTagsView: true, // 显示 ｜ 隐藏标签列表
  showSubContainer: true // 显示 ｜ 隐藏子容器
}

const mutations = {
  UPDATE_SETTING: (state: any, settings: any) => {
    Object.keys(settings).forEach((key) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = settings[key]
      }
    })
  }
}

const actions = {
  updateSetting({ commit }: any, data: any) {
    // console.log("settings action: --->", data)
    commit("UPDATE_SETTING", data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
