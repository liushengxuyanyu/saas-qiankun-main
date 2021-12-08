import { createApp } from "vue"
import ElementPlus from "element-plus"
import store from "./store"
import { router } from "./router/index"
import "element-plus/lib/theme-chalk/index.css"
import "./assets/styles/index.scss"
import "./assets/styles/element-plus.scss"
import "normalize.css/normalize.css"
import App from "./App.vue"
import "./permission" // permission control
import EventBus from "./utils/EventBus" // TODO: 这个EventBus就是为MenuTabPages准备的，可以用store替代
;(window as any).eventBus = new EventBus()

createApp(App).use(ElementPlus).use(router).use(store).mount("#app")
