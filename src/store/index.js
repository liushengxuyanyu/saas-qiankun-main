
import { createStore } from 'vuex'

import user from "./modules/user"
import menu from "./modules/menu"

import getters from "./getters"


const store = createStore({
  modules: {
    user,
    menu,
  },
  getters
})

export default store
