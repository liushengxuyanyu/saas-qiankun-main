import { createRouter, createWebHistory, createWebHashHistory} from "vue-router";

import Home from '../components/Home.vue'
import Test from '../views/test.vue'


const routes = [
  {
    path: "/",
    redirect: "/helios/portal/portalDoor"
  },
  { 
    path: '/home',
    component: Home
  },
  {
    path: '/test',
    component: Test
  }
]

export const router = createRouter({
  // history: createWebHistory('/web-main/'),
  history: createWebHistory('/web-main/'),
  routes: routes
})
