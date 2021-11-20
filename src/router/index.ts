import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from '@/components/Home.vue'
// import Test from '../views/test.vue'
import Reset from '@/views/reset-pwd/index.vue'

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
    path: '/reset',
    component: Reset
  }
]

export const router = createRouter({
  // history: createWebHistory('/web-main/'),
  history: createWebHistory('/web-main/'),
  routes: routes
})
