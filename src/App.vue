<template>
  <layout />
</template>

<script>
import { register, startQK } from './qiankun/qiankun';

import HelloWorld from './components/HelloWorld.vue';
import Layout from '@/components/Layout/Layout.vue';

import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      console.log('register', register);
      register();
      startQK({
        prefetch: 'all',
        sandbox: {
          strictStyleIsolation: true
          // experimentalStyleIsolation: true,
        },
        singular: true,
        excludeAssetFilter: (assetUrl) => {
          return /(?=map.qq.com)/.test(assetUrl);
        }
      });
    });
    return {};
  },
  components: {
    HelloWorld,
    Layout
  }
};
</script>
