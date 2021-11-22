import { router } from "./router"
import store from "./store"
import { getToken } from "@/utils/auth"
import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css" // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单: 登录页 ｜ 重置密码页。(无外层 Layout 组件包裹)
const WHITELIST_ROUTERS: string[] = [
  "/login", // 登录页
  "/reset" // 密码重置页
]

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  const token = getToken()
  if (!WHITELIST_ROUTERS.includes(to.path) && token === undefined) {
    console.log("[token: ❌ ]", to.path)
    next({
      path: "/login"
    })
  } else {
    next()
  }

  NProgress.done()
})

// 全局守卫
router.beforeResolve(async (to) => {
  // 当meta中的belongTo不为'main'时，表示路由来自子应用
  if (to.meta && to.meta.belongTo === "main") {
    store.dispatch("settings/updateSetting", to.meta)
  } else {
    store.dispatch("settings/updateSetting", {
      belongTo: "", // 设置路由地址是否属于主框架, 默认不属于
      showHeader: true, // 显示 ｜ 隐藏顶部导航栏
      showDownload: true, // 显示 ｜ 隐藏顶部右侧下载按钮
      showSidebar: true, // 显示 ｜ 隐藏侧边栏
      showTagsView: true, // 显示 ｜ 隐藏标签列表
      showSubContainer: true // 显示 ｜ 隐藏子容器
    })
  }
})

router.afterEach(() => {
  NProgress.done()
  // TODO: 可在此进行埋点操作
})
