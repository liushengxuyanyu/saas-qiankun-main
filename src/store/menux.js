import {
  createStore
} from 'vuex'

const store = createStore({
  state() {
    return {
      count: 0,
      menuPages: '',
      activeMenu: '',
      mainMenuActive: '',
      subMenus: '',
      activePane: '',
      tabPanes: '',
    }
  },
  mutations: {
    increment(state) { // context.commit('increment')
      state.count++
    },
    menuPages(state, data) {
      state.menuPages = data
    },
    activeMenu(state, data) {
      state.activeMenu = data
    },
    mainMenuActive(state, data) {
      state.mainMenuActive = data
    },
    subMenus(state, data) {
      state.subMenus = data
    },
    activePane(state, data) {
      state.activePane = data
    },
    tabPanes(state, data) {
      state.tabPanes = data
    },

  },
  actions: {
    increment(context) { // store.dispatch('increment')
      context.commit('increment')
    }
  }
});

export default store;

