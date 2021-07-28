<template>
  <div class="aside-tmpl" ref="asideRef" :class="{'aside-close': isCloseAside }" >
    <div class="arrow-ctrol"
      @click=" isCloseAside = !isCloseAside ">
      <div class="arrow"  :class="{'arrow-close': isCloseAside }" ></div>
    </div>
    <el-menu
      default-active="1-1"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="uniqueOpend">
      <template v-for="(menu, index) in menu.mainMenu"  :key=" 'key-' + index">
        <el-menu-item :index="'index-' + index " v-if="!menu.children.length" @click="fixedMenu(menu)">
          <template #title>
            <i class="el-icon-location"></i>
            <span v-html="menu.name"></span>
          </template>
        </el-menu-item>
        <el-submenu :index="'index-' + index"  v-if="menu.children.length">
          <template #title>
            <i class="el-icon-location"></i>
            <span v-html="menu.name"></span>
          </template>
          <template v-for="(children, i) in menu.children" :key="'key-' + index  + '-' + i">
            <el-menu-item :index="'index-' + index  + '-' + i"  @click="changeSubMenus(children)">
              <template #title>
                <i class="el-icon-location"></i>
                <span v-html="children.name"></span>
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
    <div class="aside-sub-tmpl" :class="{'isShowSubMenus': menu.subMenus.children && menu.subMenus.children.length}">
      <el-menu
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :default-openeds="[ 'submenu' ]"
        v-if="menu.subMenus.children"
        >
        <el-submenu index="submenu">
          <template #title>
            <i class="el-icon-location"></i>
            <span v-html="menu.subMenus.name"></span>
          </template>
          <template v-for="(children, index) in menu.subMenus.children" :key="'key-' + index ">
            <el-menu-item :index="'index-' + index"  @click="fixedMenu(children)">
              <template #title>
                <i class="el-icon-location"></i>
                <span v-html="children.name"></span>
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, reactive, watchEffect, watch, onMounted, nextTick } from 'vue'
import { menus as getmenus } from '@/api/menu'
import { router } from "../../router"

export default {
  methods: {
    handleOpen(key, keyPath) {
      // console.log('handleOpen',key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log('handleClose', key, keyPath);
    },
  },
  props:{
    emits: ['triggerCloseAside'],
    menuPages: Array,
  },
  setup(props, { emit, attrs, slots }) {

    let { menuPages } = toRefs(props)

    let menu = reactive({
      mainMenu: [],
      subMenus: {
        children: []
      }
    })

    // 获取栏目树
    getmenus().then(res=>{
      menu.mainMenu = res.result
    })

    const fixedMenu = (children) => {
      console.log("children route", router,  children.path)
      router.push(children.path.replace(/^\/web-main/i, ''))
      
      // 重置所有按钮状态
      menuPages.value.forEach(item=>{
        if(item.type != 'normal'){
          item.type = 'normal'
        }
      })
      console.log(children)
      // 如果导航为新增加的则添加否则不处理
      if( !children.children.length && !menuPages.value.includes(children) ) {
        // 为当前按钮添加先跟
        children.type = 'primary'
        menuPages.value.push(children)
      }
    }
    // 将子菜单更新到subMenus中
    const changeSubMenus = (children) => {
      fixedMenu(children)
      menu.subMenus = children
    }

    // 收起导航
    const asideRef = ref(null);
    onMounted(()=>{
      nextTick(()=>{
        window.addEventListener("click", (event)=>{
          let includesAside = event.path.includes(asideRef.value)
          // 如果点击路径不包含 aside-tmpl 则关闭二级导航
          if(!includesAside){
            menu.subMenus = {}
          }
        });
      })
    })

    // 监听关闭按钮
    let isCloseAside = ref(0);
    watch(isCloseAside, (val, preVal)=>{
      emit('triggerCloseAside', isCloseAside.value ? '0' : '180px')
    })

    return {
      isCollapse: false,
      uniqueOpend: true,
      menu,

      asideRef,
      // 子导航
      changeSubMenus,

      // 关闭左侧导航
      isCloseAside,

      // 打开新tab页
      fixedMenu,
      
    }
   },
}
</script>
<style lang="less" scoped>
.aside-tmpl{
  width: 180px;
  border: none;
  position: relative;
  flex: 1;
  left: 0;
  transition: left 0.3s;
  &>.el-menu{
    height: 100%;
    z-index: 3;
  }
  &.aside-close{
    // width: 10px;
    left: -180px;
    &>.el-menu{
      // overflow: hidden;
    }
  }

  :deep(.el-submenu .el-menu-item) {
    min-width: 179px;
  }

  .aside-sub-tmpl{
    position: absolute;
    left: -10px;
    top: 0;
    width: 180px;
    height: 100%;
    border-right: solid 1px #e6e6e6;
    background: #fff;
    z-index: 2;
    transition: left 0.3s;
    &.isShowSubMenus{
      left: 180px;
    }
    &>.el-menu{
      border-right: none;
      width: 180px;
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
    z-index: 3;
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
}
</style>
