import { createApp } from 'vue'
import store from './store'
import { router } from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './index.css'
import App from './App.vue'

import EventBus from './utils/EventBus'

(window as any).eventBus = new EventBus

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app')


