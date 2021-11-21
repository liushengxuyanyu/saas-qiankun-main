import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from '@/components/Home.vue'
import Login from '@/views/login/index.vue'
import Reset from '@/views/reset-pwd/index.vue'

// 特殊页面设置
const SPECIAL_MAIN_PAGE_META_INFO = {
  belongTo: "main", // 标明路由归属 ( `mian` - 属于主框架 | `sub`或未定义 - 属于子系统)
  showHeader: false, // 显示 ｜ 隐藏顶部右侧下载按钮
  showDownload: false, // 显示 ｜ 隐藏顶部右侧下载按钮
  showSidebar: false, // 显示 ｜ 隐藏Sidebar
  showTagsView: false, // 显示 ｜ 隐藏TagsView
  showSubContainer: false // 显示 ｜ 隐藏微服务子项目
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/helios/portal/portalDoor"
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    meta: SPECIAL_MAIN_PAGE_META_INFO,
    component: Login
  },
  {
    path: '/reset',
    meta: SPECIAL_MAIN_PAGE_META_INFO,
    component: Reset
  }
]

export const router = createRouter({
  // history: createWebHistory('/web-main/'),
  history: createWebHistory('/web-main/'),
  routes: routes
})
