import { createApp } from 'vue'
import { router } from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import store from './store'

import App from './App.vue'
import './index.css'
import EventBus from './utils/eventBus'
// import './assets/element.css'
(window as any).eventBus = new EventBus;

let app = createApp(App)
// 注入路由
app.use(router)
// 注入状态管理
app.use(store)
// 注入 ElementPlus
app.use(ElementPlus)
app.mount('#app');


