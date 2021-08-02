<template>
  <div class="saas-layout">
    <header class="saas-header">
      <LayoutHeader></LayoutHeader>
    </header>
    <div class="saas-content">
      <div
        class="aside-main"
        :class="{'index-page': activeIndexPage }"
          >
           <!-- :style="{'width': asideWidth }" -->
        <Aside @triggerCloseAside="triggerCloseAside"
               :menuPages="menuPages"
               @updateTabPanes="updateTabPanes"></Aside>
      </div>
      <div class="qiankun-container" :style="'width:calc(100% - '+ asideWidth + ')'">
        <div class="menu-pages"  v-if="menuPages.length">
          <MenuTabPages :menuPages="menuPages" />
        </div>
        <div class="qiankun-container-body">
          <template v-if="tabPanes.value && tabPanes.value.length">
          <el-tabs class="leve4Menus" 
                   @tab-click="pane=>clickTabPanes(tabPanes, pane)"
                   v-model="activePane">
            
              <el-tab-pane
                v-for="tagpane in tabPanes.value"
                :key="tagpane.id" 
                @click="clickTabPanes"
                :label="tagpane.name"
                :name="'tab-' + tagpane.defId">
              </el-tab-pane>
            

          </el-tabs>
          </template>
          <router-view></router-view>
          <div id="qiankun-sub-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, nextTick } from 'vue';
import LayoutHeader from '@/components/Layout/Header.vue';
import Aside from '@/components/Layout/Aside.vue';
import MenuTabPages from '@/components/Layout/MenuTabPages.vue';
import { router } from '../../router';

export default {
  setup() {

    let asideWidth = ref('auto');
    const triggerCloseAside = (width) => {
      asideWidth.value = width;
      console.log('closeAside', width);
    };
    let localMenuPages = localStorage.getItem('menuPages');
    let menuPages = reactive((localMenuPages && JSON.parse(localMenuPages)) || []);

    let tabPanes = reactive({ value: localStorage.getItem("tabPanes") && JSON.parse(localStorage.getItem("tabPanes")) || [] });



    tabPanes.value.find(item => { })

    let activePane = ref( localStorage.getItem("activePane") || '');



    const updateTabPanes = (tabs) => {
      tabPanes.value = tabs;
      console.log(tabs)
      tabs.length &&
        nextTick(() => {
          let item = tabPanes.value[0];
          activePane.value = 'tab-' + item.defId;
          localStorage.setItem("activePane", activePane.value)
          localStorage.setItem("tabPanes", JSON.stringify(tabs))
          router.push(item.path.replace(/^\/web-main/i, ''));
        });
      
    };

    const clickTabPanes = (tabPanes, pane) => {
      let item = tabPanes.value[pane.index];
      router.push(item.path.replace(/^\/web-main/i, ''));
      localStorage.setItem("activePane", 'tab-' + item.defId)
    };
    let activeIndexPage = ref(true)
    watch(()=> router.currentRoute, (currentRoutePath, oval)=>{
      activeIndexPage.value = /^\/helios\/portal\/portalDoor/.test(currentRoutePath.value.path)
    },{
      immediate: true,
      deep: true
    })

    return {
      asideWidth,
      triggerCloseAside,
      menuPages,
      tabPanes,
      updateTabPanes,
      clickTabPanes,
      activePane,
      activeIndexPage,
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
    overflow: hidden;
  }
  .aside-main {
    background: #fff;
    box-shadow: -1px 0px 0px 2px #e9edf1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: width 0.3s;
    z-index: 1000;
    width: 220px;
    &.index-page{
      width: 73px;
      :deep(.aside-tmpl){
        width: 73px;
        position: relative;
        .aside-sub-tmpl{
          left: 73px;
          position: absolute;
        }
      }
    }
  }
  .leve4Menus{
    margin: 20px 30px 0 30px;
  }
  .qiankun-container {
    flex: 1;
    // padding: 20px;
    box-sizing: border-box;
    width: calc(100% - 290px);
    height: 100%;
    background: #f2f3f6;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .menu-pages {
      height: 52px;
    }
    .qiankun-container-body {
      flex: 1;
      margin: 20px;
      background: #fff;
      border-radius: 6px;
      overflow-y: scroll;
    }
    #qiankun-sub-container {
      width: 100%;
      height: 100%;
      // max-width: 1240px;
      :deep(.el-form-item) {
        display: block;
      }
      :deep(.el-form--inline .el-form-item) {
        display: inline-block;
      }
    }
    :deep(#qiankun-sub-container > div) {
      height: 100%;
    }
  }
}
</style>
