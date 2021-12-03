<template>
  <Layout />
</template>

<script>
import { onMounted } from 'vue'
import { qiankunRegister, qiankunStart } from './qiankun/index'
import Layout from '@/components/Layout/index.vue'
import { clearAllLocalStorage } from './utils/storage'
import { removeToken } from './utils/auth'

export default {
  name: 'App',
  components: {
    Layout
  },
  setup() {
    onMounted(() => {
      window.addEventListener("unload", (e) => {
        // e.preventDefault()
        // 如果页面关闭，则清除所有信息(cookies + localstorage)
        // removeToken("ccs-token")
        // clearAllLocalStorage()
      })
      // 如何同时激活两个微应用: 
      // https://qiankun.umijs.org/zh/faq#%E5%A6%82%E4%BD%95%E5%90%8C%E6%97%B6%E6%BF%80%E6%B4%BB%E4%B8%A4%E4%B8%AA%E5%BE%AE%E5%BA%94%E7%94%A8
      qiankunRegister()
      qiankunStart({
        prefetch: false,
        sandbox: false,
        singular: true,
        // singular: false,
        excludeAssetFilter: (assetUrl) => {
          return /(?=map.*.com)/.test(assetUrl)
        }
      })
    })

    return {

    }
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
