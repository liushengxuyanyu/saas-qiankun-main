<template>
  <layout>
    <div id='frame'></div>
  </layout>
</template>

<script>

import { register, startQK } from './qiankun'

import HelloWorld from './components/HelloWorld.vue'
import Layout from '@/components/Layout/Layout.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
    Layout
  },
  mounted(){
    register();
    startQK({
      prefetch: 'all',
      sandbox: {
        strictStyleIsolation: true
      },
      singular: true
    })
  }
}
</script>
