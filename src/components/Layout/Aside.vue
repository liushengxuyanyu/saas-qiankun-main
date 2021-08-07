<template>
  <div class="aside-tmpl" ref="asideRef" :class="{'aside-close': isCloseAside }" >
    <!-- <div class="arrow-ctrol"
      @click=" isCloseAside = !isCloseAside ">
      <div class="arrow"  :class="{'arrow-close': isCloseAside }" ></div>
    </div> -->
    <el-menu
      :default-active="mainMenuActive"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="isCollapse"
      :unique-opened="uniqueOpend">
      <template v-for="(menu, index) in menu.mainMenu"  :key=" 'key-' + index">
        <!-- @mouseover="changeSubMenus(menu)" -->
        <el-menu-item :index="'main-menu-' + index " 
          style="padding-left:5px"
          v-if="!menu.children.length  && !menu.hide" @click="changeSubMenus(menu, 'index-page')">
          <template #title>
            <i class="svg-icon" :class="[ 'icon-' + menu.icon]"></i>
            <span v-html="menu.pluginName.substring(0,2)"></span>
          </template>
        </el-menu-item>
        <el-menu-item 
          :index="'main-menu-' + index"  
          v-if="menu.children.length && !menu.hide" 
          style="padding-left:5px"
          @click="changeSubMenus(menu, 'main-menu-' + index)">
          <template #title>
            <i class="svg-icon" :class="[menu.icon]"></i>
            <span v-html="menu.pluginName.substring(0,2)"></span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="aside-sub-tmpl" 
      v-if="menu.subMenus.children && menu.subMenus.children.length" 
      :class="{'isShowSubMenus': menu.subMenus.children && menu.subMenus.children.length}">
      <div>
        <p class="sub-title">{{menu.subMenus.name}}</p>
      </div>
      <el-menu
        @open="handleOpen"
        @close="handleClose"
        collapse-transition="true"
        :default-openeds="defaultOpeneds"
        :default-active="activeMenu"
        @select="handleSelect"
        menu-trigger="hover"
        >
      <template v-for="(submenu, index) in menu.subMenus.children" :key="'key-' + index ">
        <el-menu-item :index="'index-' + index " v-if="!submenu.children.length && !submenu.hide" @click="fixedMenu(submenu)">
          <template #title>
            <i></i>
            <span v-html="submenu.name"></span>
          </template>
        </el-menu-item>
        <el-submenu :index="'index-' + index"  v-if="submenu.children.length && !submenu.hide">
          <template #title>
            <i></i>
            <span v-html="submenu.name"></span>
          </template>
          <template v-for="(submenuChild, i) in submenu.children" :key="'key-' + index  + '-' + i">
            <el-menu-item :index="'index-' + index  + '-' + i" v-if="!submenuChild.hide"  @click="fixedMenu(submenuChild, 4)">
              <template #title>
                <i></i>
                <span v-html="submenuChild.name"></span>
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, reactive, watchEffect, watch, onMounted, nextTick } from 'vue'
import { menus as getmenus } from '@/api/menu'
import { router } from "../../router"
import { pageVisit } from "../../api/menu"
import { state } from "../../qiankun/state"

export default {
  methods: {
    handleOpen(key, keyPath) {
      // console.log('handleOpen',key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log('handleClose', key, keyPath);
    },
    handleSelect(key, keyPath){
      localStorage.setItem("activeMenu", key);
    } 
  },
  props:{
    emits: ['triggerCloseAside'],
    menuPages: Array,
  },
  setup(props, { emit, attrs, slots }) {

    
    let { menuPages } = toRefs(props)
    let menu = reactive({
      mainMenu: [],
      subMenus: JSON.parse(localStorage.getItem('subMenus')) || {
        children: []
      }
    })

    let defaultOpeneds =  ref(['index-0', 'index-1', 'index-2', 'index-3', 'index-4'])

    let setMenusDefult = (
        mainMenuActive, 
        subMenus, activeMenu1, 
        tabPanes, activePane
      ) => {
        // 更新默认状态，及存储
        localStorage.setItem("mainMenuActive", mainMenuActive || '')
        localStorage.setItem("subMenus", JSON.stringify(subMenus) || {})
        localStorage.setItem("activeMenu", activeMenu1 || '')
        menu.subMenus = subMenus || {}
        activeMenu.value = activeMenu1 || {}
        localStorage.setItem("activePane", activePane || '')
        emit("updateTabPanes", tabPanes || [], activePane || "")
    };

    let foreachMenus = (menu) => {
      let currentPath = router.currentRoute.value.href
      try{
        menu.mainMenu.forEach((leve1, leve1Index)=>{
          let mainMenu = `main-menu-${leve1Index}`
          if(leve1.path == currentPath){
            setMenusDefult(mainMenu, null, null, null, null)
            throw new Error("stop leve1")
            return
          }
          leve1.children.forEach((leve2, leve2Index)=>{
            let level2Menu = `index-${leve2Index}`
            if(leve2.path == currentPath){
              setMenusDefult(mainMenu, leve1, level2Menu, null, null)
              throw new Error("stop leve2")
              return;
            }
            leve2.children.forEach((level3, leve3Index)=>{
              let level3Menu = `${level2Menu}-${leve3Index}`
              if(level3.path == currentPath){
                setMenusDefult(mainMenu, leve1, level3Menu, null, null)
                throw new Error("stop leve3")
                return;
              }
              level3.children.forEach((level4, leve4Index)=>{
                if(level4.path == currentPath){
                  let level4Menu = `tab-${level4.defId}`
                  setMenusDefult(mainMenu, leve1, level3Menu, level3.children, level4Menu)
                  throw new Error("stop leve4")
                }
              })
            })
          })
        })
      }catch(e){
        // 用于终止forEach循环
        console.log(e.message)
      }
      
    }
    // 获取栏目树
    getmenus().then(res=>{
      let info = {
        user: {},
        menus: {
          tree: [],
          hashIndexRole: true
        }
      }

      let nav = res.result.find((nav)=>{
        return nav.name == '首页'
      })
      
      if(!nav){
        res.result.unshift({
          actionList: null,
          authority: null,
          children: [],
          code: "",
          component: "",
          defId: 124475,
          defParentId: 124474,
          hide: 0,
          icon: "home-index",
          id: 0,
          label: "首页",
          localPath: "",
          method: "",
          name: "首页",
          parentId: 124474,
          path: "/web-main/helios/portal/portalDoor?wellcome",
          pluginName: "首页",
          redirect: null,
          sort: 0,
          spread: false,
          type: "0",
          url: "",
          webPath: "",
        })
        info.menus.hashIndexRole = false
      }
      info.menus.tree = res.result
      state.setGlobalState(info)
      foreachMenus({ mainMenu: res.result })
      nextTick(()=>{
        menu.mainMenu = res.result
      })
    })
    
    const fixedMenu = (children, level) => {
      if(children.path && children.path != router.currentRoute.value.path ){
        router.push(children.path.replace(/^\/web-main/i, ''))
        pageVisit({
          href: children.path,
          tabName: children.name,
          name: children.name,
        })
      }
      // history.pushState( {}, children.name || "零售云", children.path)
      
      // 重置所有按钮状态
      menuPages.value.forEach(item=>{
        if(item.type != 'primary'){
          item.type = 'primary'
        }
      })
      // emit('updateTabPanes', level == 4 ? children.children : []) 
      if(level == 4){
        emit('updateTabPanes', children.children ) 
        if(!children.children.length){
          localStorage.setItem("activePane", '')
          localStorage.setItem("tabPanes", JSON.stringify([]))
        }
      }

      // 如果导航为新增加的则添加否则不处理
      if( !children.children.length && !menuPages.value.find(item=>{ return item.defId == children.defId }) ) {
        // 为当前按钮添加先跟
        children.type = 'primary'
        menuPages.value.push(children)
        if(menuPages.value.length > 10){
          menuPages.value.shift()
          // menuPages.value = menuPages.value.splice(1,10)
        }
        localStorage.setItem("menuPages", JSON.stringify(menuPages.value));
      }
    }
    // 将子菜单更新到subMenus中
    const changeSubMenus = (children, index) => {
      emit("mainMenusClick", index)
      localStorage.setItem("mainMenuActive", index) 
      fixedMenu(children)
      localStorage.setItem("subMenus", JSON.stringify(children))
      activeMenu.value = "";
      menu.subMenus = children
    }

    // 收起导航
    const asideRef = ref(null);
    onMounted(()=>{
      // nextTick(()=>{
      //   window.addEventListener("click", (event)=>{
      //     let includesAside = event.path.includes(asideRef.value)
      //     // 如果点击路径不包含 aside-tmpl 则关闭二级导航
      //     if(!includesAside){
      //       menu.subMenus = {}
      //     }
      //   });
      // })
    })

    // 监听关闭按钮
    let isCloseAside = ref(0);
    watch(isCloseAside, (val, preVal)=>{
      emit('triggerCloseAside', isCloseAside.value ? '0' : '152px')
    })

    //  子菜单的状态
    let activeMenu = ref( localStorage.getItem("activeMenu") || '');

    // 主导航的选中状态
    let mainMenuActive = ref( localStorage.getItem("mainMenuActive") || '');

    return {
      isCollapse: false,
      uniqueOpend: true,
      menu,

      asideRef,
      // 子导航
      changeSubMenus,
      defaultOpeneds,

      // 关闭左侧导航
      isCloseAside,

      // 打开新tab页
      fixedMenu,

      activeMenu,

      // 主菜单的选中状态
      mainMenuActive,
      
    }
   },
}
</script>
<style lang="less" scoped>
.aside-tmpl{
  border: none;
  flex: 1;
  left: 0;
  display: flex;
  height: 100%;
  &>.el-menu{
    height: 100%;
    z-index: 1003;
    width: 72px;
    flex: 1;
    :deep(.el-menu-item){
      height: 50px;
      line-height: 50px;
      &.is-active{
        background-color: var(--el-menu-item-hover-fill);
      }
    }
    .is-opened{
      background-color: var(--el-menu-item-hover-fill);
    }
  }
  &.aside-close{
    // width: 10px;
    left: -152px;
    &>.el-menu{
      // overflow: hidden;
    }
  }

  :deep(.el-submenu .el-menu-item) {
    min-width: 179px;
    height: 50px;
    line-height: 50px;
  }

  .aside-sub-tmpl{
    width: 152px;
    height: 100%;
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    &.isShowSubMenus{
      
    }
    &>.el-menu{
      border-right: none;
      width: 152px;
      :deep(.el-submenu__title, .el-menu-item){
        height: 50px;
        line-height: 50px;
        &.is-active{
          background-color: var(--el-menu-item-hover-fill);
        }
      }
    }
    .sub-title{
      font-size: 16px;
      font-weight: bold;
      text-indent: 2em;
      padding-top: 26px;
      padding-bottom: 2px;
    }
  }
  .arrow-ctrol{
    width: 10px;
    height: 48px;
    background: #C0CBE0;
    border-radius: 0px 4px 4px 0px;
    position: absolute;
    right: -10px;
    top: 30%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    z-index: 1003;
    .arrow{
      border: 4px solid #818EA9;
      border-left: none;
      border-top-color: transparent;
      border-bottom-color:transparent;
      width: 0px;
      height: 0px;
      &.arrow-close{
        border: 4px solid #818EA9;
        border-right: none;
        border-top-color: transparent;
        border-bottom-color:transparent;
      }
    }
  }
  .svg-icon {
    font-size: 15px;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    display: inline-block;
    background-size: 15px 15px;
    background-repeat: no-repeat;
    padding-right: 5px;
    box-sizing: content-box;
    &:after, &:before {
      box-sizing: content-box;
    }
    &.icon-home-index{
      background-image: url("@/assets/icons/index.svg");
    }
    &.portal-manage{
      background-image: url("@/assets/icons/115.svg");
    }
    &.product-info{
      background-image: url("@/assets/icons/117.svg");
    }
    &.marketing-manage{
      vertical-align: -0.25em;
      background-image: url("@/assets/icons/112.svg");
    }
    &.trade-manage{
      vertical-align: -0.25em;
      background-image: url("@/assets/icons/118.svg");
    }
    &.station-manage{
      vertical-align: -0.25em;
      background-image: url("@/assets/icons/113.svg");
    }
    &.setup-station{
      background-image: url("@/assets/icons/111.svg");
    }
    &.customer-service{
      background-image: url("@/assets/icons/116.svg");
    }
  }
  :deep(.el-icon-arrow-down:before){content:""}
  :deep(.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow) {
    transform: rotateZ(90deg);
  }
  ::-webkit-scrollbar
  {
    width: 2px;
    height: 2px;
    background-color: #fff;
  }
  
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.05);
    border-radius: 2px;
    background-color: #fff;
  }
  
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);
    background-color: #555;
  }
}
</style>
