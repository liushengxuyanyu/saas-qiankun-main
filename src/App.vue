<template>
  <layout/>
</template>

<script>

import { register, startQK } from './qiankun'

import HelloWorld from './components/HelloWorld.vue'
import Layout from '@/components/Layout/Layout.vue'

import { ref, reactive, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    onMounted(()=> {
      console.log('register', register)
      register();
      startQK({
        prefetch: 'all',
        sandbox: {
          strictStyleIsolation: true
        },
        singular: true
      })
    })
    return { }
   },
  components: {
    HelloWorld,
    Layout
  },
  
}
</script>
