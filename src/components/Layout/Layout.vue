<template>
  <div class="saas-layout">
    <header class="saas-header">
      <LayoutHeader></LayoutHeader>
    </header>
    <div class="saas-content">
      <div class="aside-main"
           :style="{'width': asideWidth }">
        <Aside @triggerCloseAside="triggerCloseAside"
               :menuPages="menuPages"
               @updateTabPanes="updateTabPanes"
               ></Aside>
      </div>
      <div class="qiankun-container">
        <div class="menu-pages">
          <MenuTabPages :menuPages="menuPages" />
        </div>
        <div class="qiankun-container-body">
          <el-tabs 
            v-if="tabPanes.value && tabPanes.value.length" 
            @tab-click="pane=>clickTabPanes(tabPanes, pane)"
            v-model="activePane">
            <template v-for="tagpane in tabPanes.value" :key="tagpane.id">
              <el-tab-pane
                @click="clickTabPanes"
                :label="tagpane.name"
                :name="tagpane.name">
                </el-tab-pane>
            </template>
            
          </el-tabs>
          <router-view></router-view>
          <div id="qiankun-sub-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch , nextTick} from 'vue';
import LayoutHeader from '@/components/Layout/Header.vue';
import Aside from '@/components/Layout/Aside.vue';
import MenuTabPages from '@/components/Layout/MenuTabPages.vue';
import { router } from "../../router"

export default {
  setup() {
    let asideWidth = ref('auto');
    const triggerCloseAside = (width) => {
      asideWidth.value = width;
      console.log('closeAside', width);
    };
    let localMenuPages = localStorage.getItem('menuPages');
    let menuPages = reactive((localMenuPages && JSON.parse(localMenuPages)) || []);

    let tabPanes = reactive([]);
    let activePane = {}

    const updateTabPanes = (tabs) =>{
      tabPanes.value = tabs
      nextTick(()=>{
        let item = tabPanes.value[0]
        console.log(item)
        activePane = item.name;
        router.push(item.path.replace(/^\/web-main/i, ''))
      })
    }

    const clickTabPanes = (tabPanes, pane) => {
      let item = tabPanes.value[pane.index]
      router.push(item.path.replace(/^\/web-main/i, ''))
    }

    return {
      asideWidth,
      triggerCloseAside,
      menuPages,
      tabPanes,
      updateTabPanes,
      clickTabPanes,
      activePane
    };
  },
  components: {
    LayoutHeader,
    Aside,
    MenuTabPages
  }
};
</script>

<style lang="less" scoped>
.saas-layout {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  height: 100%;
  align-content: flex-start;
  & > .saas-header {
    height: 50px;
    box-shadow: 0px 3px 6px 2px #e5e9ed;
    background: #fff;
    z-index: 1100;
  }
  & > .saas-content {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 100%;
    align-content: flex-start;
    overflow-y: scroll;
  }
  .aside-main {
    background: #fff;
    box-shadow: -1px 0px 0px 2px #e9edf1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: width 0.3s;
    z-index: 1000;
  }
    
  .qiankun-container {
    flex: 1;
    // padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #F2F3F6;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .menu-pages{
      height: 52px;
    }
    .qiankun-container-body{
      flex: 1;
      margin: 20px;
      background: #fff;
      padding: 20px;
      border-radius: 6px;
    }
    #qiankun-sub-container {
      width: 100%;
      height: 100%;
    }
    :deep(#qiankun-sub-container  > div){
      height: 100%;
    }
  }

}
</style>
