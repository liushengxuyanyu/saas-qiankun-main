import { createRouter, createWebHashHistory} from "vue-router";

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
  history: createWebHashHistory('/web-main/'),
  routes: routes
})