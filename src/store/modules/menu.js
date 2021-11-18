
const menu = {
  state: {
    menus: [],
  },

  mutations: {
    setMenus: (state, menus) => {
      state.menus = menus;
    },
  },

  actions: {
    getMenus({ commit }, menus){
      commit('setMenus', menus)
      // TODO other
    },
  }
};

export default menu;
