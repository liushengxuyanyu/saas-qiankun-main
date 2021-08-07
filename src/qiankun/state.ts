import {
  initGlobalState,
  MicroAppStateActions
} from "qiankun"

  // 初始化 state
  let stateInit = {
    user: {},
    menus: {
      tree: {},
      hashIndexRole: false
    }, 
  }
  const actions: MicroAppStateActions = initGlobalState(stateInit);

  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });

  export const state = actions;
  // actions.setGlobalState(state);
  // actions.offGlobalStateChange();