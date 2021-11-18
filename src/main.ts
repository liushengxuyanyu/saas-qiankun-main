import { createApp } from 'vue'
import store from './store'
import { router } from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './index.css'
import App from './App.vue'

import "./permission" // permission control
import EventBus from './utils/EventBus' // TODO: 这个EventBus就是为MenuTabPages准备的，可以用store替代

(window as any).eventBus = new EventBus

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app')


