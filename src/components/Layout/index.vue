<template>
  <div class="saas-layout">
    <header class="saas-header">
      <LayoutHeader></LayoutHeader>
    </header>
    <div class="saas-content">
      <div class="aside-main" :class="{'index-page': isIndexPage.active }">
        <Aside 
          ref="asideRef"
          :menuPages="menuPages"
          @triggerCloseAside="triggerCloseAside"
          @mainMenusClick="mainMenusClick"
          @updateTabPanes="updateTabPanes">
        </Aside>
      </div>
      <div class="qiankun-container" :style="'width:calc(100% - '+ asideWidth + ')'">
        <div class="menu-pages" v-if="menuPages.length">
          <MenuTabPages 
            ref="menuTabPagesRef" 
            :menuPages="menuPages"
            @updateRouter="updateMenuPages" 
          />
        </div>
        <div class="qiankun-container-body">
          <!-- {{ tabPanes }} -->
          <template v-if="tabPanes.value && tabPanes.value.length">
            <el-tabs v-model="activePane" class="leve4Menus" info="四级导航" @tab-click="pane => clickTabPanes(tabPanes, pane)">
              <el-tab-pane 
                v-for="tagpane in tabPanes.value"
                :key="tagpane.defId"
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
import { ref, reactive, watch, nextTick } from 'vue'
import Aside from '@/components/Layout/Aside.vue'
import LayoutHeader from '@/components/Layout/Header/index.vue'
import MenuTabPages from '@/components/Layout/MenuTabPages.vue'
import { router } from '../../router'
import { pageVisit } from '../../api/menu'

export default {
  setup() {
    const asideRef = ref(null)
    const menuTabPagesRef = ref(null)
    let activePane = ref('')
    let asideWidth = ref('auto')
    let isIndexPage = reactive({ active: false })
    let localMenuPages = localStorage.getItem('menuPages')
    let menuPages = reactive((localMenuPages && JSON.parse(localMenuPages)) || [])
        
    let tabPanes = reactive({
      value: []
    })
    
    localStorage.removeItem('navMenus')
    const triggerCloseAside = (width) => {
      asideWidth.value = width
      console.log('closeAside', width)
    }

    const updateTabPanes = (tabs, activePaneVal, auto) => {
      tabPanes.value = tabs.filter((item) => {
        return item.hide == 0
      })
      tabs.length &&
        nextTick(() => {
          let item = tabs.find((item) => 'tab-' + item.defId == activePaneVal) || tabPanes.value[0]
          activePane.value = 'tab-' + item.defId
          auto && router.push(item.path.replace(/^\/web-main/i, ''))
        })
    }

    const clickTabPanes = (tabPanes, pane) => {
      let item = tabPanes.value[pane.index]
      router.push(item.path.replace(/^\/web-main/i, ''))
      asideRef.value.updateMenuPages(item)
      pageVisit({
        href: item.path,
        tabName: item.name,
        name: item.name
      })
    }

    watch(
      () => router.currentRoute,
      (currentRoutePath, oval) => {
        isIndexPage.active = /^\/helios\/portal\/portalDoor/.test(currentRoutePath.value.path)
      },
      {
        immediate: true,
        deep: true
      }
    )

    const mainMenusClick = (index) => {
      console.log('触发 mainMenusClick: --->', index)
      isIndexPage.active = index == 'main-menu-0'
    }
    
    const updateMenuPages = () => {
      console.log('updateMenuPages: --->', asideRef.value.getMenusTree())
    }

    window.addEventListener('popstate', (event) => {
      let path = event.currentTarget.location.pathname + event.currentTarget.location.search
      if (event.state.isHistoryPush) {
        let { name, defId } = event.state
        if (!defId) {
          defId = 'id' + encodeURIComponent(name).replace(/[^a-zA-Z0-9]/gi, '')
        }
        if (path && name && defId) {
          asideRef.value.fixedMenu({ path, name, defId, children: [] }, 4)
        }
      }
      if(event.state.closeDefId){
        let index = menuPages.findIndex((item)=>{ return item.defId == event.state.closeDefId})
        index > -1 && menuTabPagesRef.value.closeTab({}, index)
      }
      asideRef.value.getMenusTree(path)
    })

    return {
      asideRef,
      asideWidth,
      triggerCloseAside,
      mainMenusClick,
      menuPages,
      tabPanes,
      updateTabPanes,
      clickTabPanes,
      activePane,
      isIndexPage,
      updateMenuPages,
      menuTabPagesRef,
    }
  },
  components: {
    LayoutHeader,
    Aside,
    MenuTabPages
  }
}
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
    z-index: 910;
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
    z-index: 900;
  }
  .leve4Menus {
    margin: 20px 30px 0 30px;
    :deep(.el-tabs__active-bar) {
      background-color: #1f5afa;
    }
    :deep(.el-tabs__item.is-active) {
      font-weight: 500;
      color: #222c3d;
    }
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
      margin: 0 15px 10px 15px;
      background: #fff;
      border-radius: 6px;
      overflow-y: scroll;
      .rank-block {
        position: relative;
        .full-screen {
          position: absolute;
          z-index: 1;
          right: 40px;
          top: 10px;
          font-size: 22px;
          color: #4c5d7c;
          i {
            position: absolute;
            left: 0;
            top: 0;
          }
          .el-icon-plus {
            transform: rotate(45deg);
            transition: transform 0.5s;
          }
          &.close-screen {
            .el-icon-plus {
              transform: rotate(0deg);
            }
          }
        }
      }
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
