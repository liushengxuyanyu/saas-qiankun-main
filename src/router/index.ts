import { createRouter, createWebHistory, createWebHashHistory} from "vue-router";

import Foo from '../components/Foo.vue'
import Bar from '../components/Bar.vue'


const routes = [
  {
    path: '/',
    redirect: '/foo'
  },
  { 
    path: '/foo', 
    component: Foo
  },
  { 
    path: '/bar', 
    component: Bar 
  }
]


export const router = createRouter({
  // history: createWebHistory('/web-main/'),
  history: createWebHashHistory('/'),
  routes: routes
})