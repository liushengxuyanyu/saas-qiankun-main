import { router } from "./router"
import store from "./store"
import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css" // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单: 登录页 ｜ 重置密码页。(无外层 Layout 组件包裹)
const WHITELIST_ROUTERS: string[] = [
  "/login", // 登录页
  "/reset" // 密码重置页
]

router.beforeEach((to, from, next) => {
  console.log("to: --->", to)
  console.log("from: --->", from)
  // start progress bar
  NProgress.start()
  const token = 'asdf' // getToken()
  if (token) {
    console.log("[token: ✅ ]", token)

    NProgress.done()
  } else {
    console.log("[token: ❌ ]")

    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
  // TODO: 可在此进行埋点操作
  // todo ...
})
