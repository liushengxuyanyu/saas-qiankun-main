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
      // console.log('register', register);
      register();
      startQK({
        prefetch: false,
        sandbox: false,
        // sandbox: {
        //   strictStyleIsolation: true
        //   // experimentalStyleIsolation: true,
        // },
        singular: true,
        excludeAssetFilter: (assetUrl) => {
          return /(?=map.*.com)/.test(assetUrl);
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
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  :deep(#qiankun-sub-container > div[data-name='heliosHeimdall']) {
    .main-content .i-router-view {
      padding: 0;
    }
    .el-button--small {
      font-size: 13px;
    }
  }
}
</style>
