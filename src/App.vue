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
        sandbox: false,
        // sandbox: {
        //   strictStyleIsolation: true
        //   // experimentalStyleIsolation: true,
        // },
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
<style lang="less">
#qiankun-sub-container > div[data-name='heliosHeimdall']{
  .main-content .i-router-view{
    padding: 0;
  }
}
</style>
