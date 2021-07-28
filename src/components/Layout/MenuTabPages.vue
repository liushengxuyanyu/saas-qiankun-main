<template>
  <el-row class="menuTapItems" v-if="menuPages.length">
    <el-button v-for="(menu, index) of menuPages" :key="index" size="small" :type="menu.type" >
      {{menu.name}}
      <i @click="closeTab(index)" class="el-icon-close el-icon--right"></i>
    </el-button>
  </el-row>
</template>
<script>
import { toRefs, reactive, watch, nextTick } from 'vue'
import { router } from "../../router"
export default {
  props:{
    menuPages: Array,
  },
  setup(props, { emit, attrs, slots }) {
    
    let { menuPages } = toRefs(props)

    // 路由发生变化后，更新按钮选中状态
    watch(()=> router.currentRoute, (currentRoute, oval)=>{
      let currentPath = currentRoute.value.href
      menuPages.value.forEach(item => {
        if(item.path == currentPath){
            item.type = 'primary'
            return
          }
          if(item.type != 'normal'){
            item.type = 'normal'
          }
      });
    },{
      // immediate: true,
      deep: true
    })

    const closeTab = (index) => {
      menuPages.value.splice(index, 1);
    }
    return {
      menuPages,
      closeTab
    }
  }
}
</script>
<style lang="less">
.menuTapItems{
  padding: 20px 20px 0;
  margin-bottom: 5px;
  .el-button {
    background: #fff;
    border-radius: 4px;
    &.el-button--primary{
      background: linear-gradient( 315deg ,#3130f4,#1378ff);
      span{
        color: #fff;
      }
    }
  }
}
</style>