import { createRouter, createWebHistory, createWebHashHistory} from "vue-router";

import Home from '../components/Home.vue'


const routes = [
  {
    path: "/",
    redirect: "/helios/portal/portalDoor"
  },
  { 
    path: '/home',
    component: Home
  },
]

export const router = createRouter({
  // history: createWebHistory('/web-main/'),
  history: createWebHistory('/web-main/'),
  routes: routes
})