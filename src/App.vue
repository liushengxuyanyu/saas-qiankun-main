<template>
  <Layout />
</template>

<script>
import { onMounted } from 'vue'
import { qiankunRegister, qiankunStart } from './qiankun/index'
import Layout from '@/components/Layout/index.vue'

export default {
  name: 'App',
  components: {
    Layout
  },
  setup() {
    onMounted(() => {
      qiankunRegister()
      qiankunStart({
        prefetch: false,
        sandbox: false,
        singular: true,
        excludeAssetFilter: (assetUrl) => {
          return /(?=map.*.com)/.test(assetUrl)
        }
      })
    })

    return {}
  }
}
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
