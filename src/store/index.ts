
import { createStore, Store } from 'vuex'

import user from "./modules/user"
import menu from "./modules/menu"
import settings from "./modules/settings"

import getters from "./getters"

const store: Store<any> = createStore({
  modules: {
    user,
    menu,
    settings
  },
  getters
})

export default store
