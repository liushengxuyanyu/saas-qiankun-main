import { router } from "./router"
import store from "./store"
import { getToken } from "@/utils/auth"
import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css" // progress bar style
import { hokdoInit } from "./hokdo"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单: 登录页 ｜ 重置密码页。(无外层 Layout 组件包裹)
const WHITELIST_ROUTERS: string[] = [
  "/login", // 登录页
  "/reset" // 密码重置页
]

// 处理子框架的规则白名单
const SUB_SCRM_URL_LIST: string[] = [
  "/ms-admin/business/private/scrm", // NOTE: 营销项目的SCRM页面配置需要隐藏侧边栏和menuTabs
  "/ms-admin/business/private/app", // NOTE: 营销项目的SCRM,打开应用页面需要隐藏侧边栏和menuTabs
  "/wuliu/dds-qiankun/dds/new-dashboard", // NOTE: 门店项目的实时看板,打开应用页面需要隐藏侧边栏和menuTabs
  "/wuliu/tms2/tms/base-center/online-protocol/details" // NOTE: 配送项目的在线协议,打开应用页面需要隐藏侧边栏和menuTabs
]

router.beforeEach((to, from, next) => {
  // 获取当前token信息
  const token = getToken()
  // start progress bar
  NProgress.start()
  // console.log("[🐒 token]: --->", token, to.path)

  if (!WHITELIST_ROUTERS.includes(to.path) && token === undefined) {
    console.log("[token: ❌ ]", to.path)
    next({
      path: "/login"
    })
  } else {
    console.log("[token: ✅ ]", to.path)
    // 登录成功后执行hokdoInit方法
    // hokdoInit()
    next()
  }

  NProgress.done()
})

// 全局守卫
router.beforeResolve(async (to) => {
  // 获取当前token信息
  const token = getToken()
  // console.log("to: --->>>", to)
  // 当meta中的belongTo不为'main'时，表示路由来自子应用
  if (to.meta && to.meta.belongTo === "main") {
    if (to.path === "/login" && getToken()) {
      router.replace({
        // path: "/home"
        path: "/helios/portal/portalDoor"
      })
      return false
    } else {
      store.dispatch("settings/updateSetting", to.meta)
      // return true
    }
  } else {
    if (SUB_SCRM_URL_LIST.includes(to.path) && token !== undefined) {
      store.dispatch("settings/updateSetting", {
        belongTo: "", // 设置路由地址是否属于主框架, 默认不属于
        showHeader: true, // 显示 ｜ 隐藏顶部导航栏
        showDownload: true, // 显示 ｜ 隐藏顶部右侧下载按钮
        showSidebar: false, // 显示 ｜ 隐藏侧边栏
        showTagsView: false, // 显示 ｜ 隐藏标签列表
        showSubContainer: true // 显示 ｜ 隐藏子容器
      })
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
  }
})

router.afterEach(() => {
  NProgress.done()
  // TODO: 可在此进行埋点操作
})
