<template>
  <div class="saas-layout">
    <header class="saas-header">
      <LayoutHeader></LayoutHeader>
    </header>
    <div class="saas-content">
      <div class="aside-main" :style="{'width': asideWidth }">
        <Aside @triggerCloseAside="triggerCloseAside"></Aside>
      </div>
      <div class="content">
        <div class="qiankun-container">
          <router-view></router-view>
          <div id="ms-admin"></div>
          <div id="ms-admin-404"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import LayoutHeader from '@/components/Layout/Header.vue'
import Aside from '@/components/Layout/Aside.vue'

export default {
  setup() {
    let asideWidth = ref('auto')
    const triggerCloseAside = (width) => {

      asideWidth.value = width
      console.log('closeAside', width)
    }
    return {
      asideWidth,
      triggerCloseAside,
    }
  },
  components: {
    LayoutHeader,
    Aside
  }
}
</script>

<style lang="less" scoped>
.saas-layout{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  height: 100%;
  align-content: flex-start;
  & > .saas-header {
    height: 50px;
    box-shadow: 0px 3px 6px 2px #E5E9ED;
    background: #fff;
    z-index: 100;
  }
  & > .saas-content{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 100%;
    align-content: flex-start;
  }
  .aside-main{
    background: #fff;
    box-shadow: -1px 0px 0px 2px #E9EDF1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: width 0.3s;
  }
  .content{
    flex: 1;
    .qiankun-container{
      padding: 20px;
    }
  }
}
</style>