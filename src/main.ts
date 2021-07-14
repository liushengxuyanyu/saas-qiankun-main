import { createApp } from 'vue'
import {router} from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import App from './App.vue'
import './index.css'



let app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
