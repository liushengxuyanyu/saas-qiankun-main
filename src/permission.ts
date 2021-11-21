import { router } from "./router"
import store from "./store"
import { getToken } from "@/utils/auth"
import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css" // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单: 登录页 ｜ 重置密码页。(无外层 Layout 组件包裹)
// const WHITELIST_ROUTERS: string[] = [
//   "/login", // 登录页
//   "/reset" // 密码重置页
// ]

router.beforeEach((to, from, next) => {
  console.log("to: --->", to)
  console.log("from: --->", from)
  // start progress bar
  NProgress.start()
  const token = getToken()
  if (token) {
    console.log("[token: ✅ ]", token)
    // 路由信息中包含meta信息时
    if (Object.keys(to.meta).length > 0) {
      const meta = to.meta
      console.log("[belongTo]: --->", meta)
      // 处理新开路由页面的meta信息
      // Object.keys(meta).forEach(key => {
      //   console.log('===>>>', key, meta[key])
      //   store.dispatch("settings/updateSetting", {
      //     key: key,
      //     val: meta[key]
      //   })
      // })
      store.dispatch("settings/updateSetting", meta)
    } else {
      // 更新store中的`belongTo`信息，设置为'', 标记为非主框架路由
      store.dispatch("settings/updateSetting", {
        // key: "belongTo",
        // val: "sub"
        belongTo: "sub",
        showHeader: true, // 显示 ｜ 隐藏顶部导航栏
        showDownload: true, // 显示 ｜ 隐藏顶部右侧下载按钮
        showSidebar: true, // 显示 ｜ 隐藏侧边栏
        showTagsView: true // 显示 ｜ 隐藏标签列表
      })
    }

    // if (WHITELIST_ROUTERS.indexOf(to.path) !== -1) {
    //   // 有token，防止用户手动输入白名单中的路由地址而产生错误，统一跳转welcome页
    //   next({ path: to.path })
    // } else {
    //   next()
    // }
    next()

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
