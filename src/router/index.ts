import { createRouter, createWebHistory, createWebHashHistory} from "vue-router";

import Foo from '../components/Foo.vue'


const routes = [
  { 
    path: '/', 
    component: Foo
  },
]


export const router = createRouter({
  // history: createWebHistory('/web-main/'),
  history: createWebHistory('/web-main/'),
  routes: routes
})