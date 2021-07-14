<template>
  <el-menu
    default-active="1-1"
    class="aside-tmpl"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :unique-opened="uniqueOpend">
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
      <el-submenu index="1-4">
        <template #title>选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
        <el-menu-item index="1-4-2">选项2</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="2">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航二</span>
      </template>

      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>

      <el-submenu index="2-4">
        <template #title>选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
      </el-submenu>
    </el-submenu>
    
  </el-menu>
</template>
<script>
import { ref, reactive } from 'vue'
export default {
  setup() {
     return {
       isCollapse: false,
       uniqueOpend: true,
     }
   },
   methods: {
    handleOpen(key, keyPath) {
      console.log('handleOpen',key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log('handleClose', key, keyPath);
    }
  }
}
</script>
<style lang="less" scoped>
.aside-tmpl{
  width: 180px;
  border: none;
  position: relative;
  
  :deep(.el-submenu .el-menu-item){
    padding-right: 0;
  }
  :deep(.el-menu){
    position: inherit;
  }
  :deep(.is-opened .is-opened .el-menu){
    position: absolute;
    left: 180px;
    top: 0px;
  }
}
</style>
