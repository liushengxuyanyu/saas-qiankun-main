<template>
  <el-row v-if="menuPages.length">
    <el-button v-for="(menu, index) of menuPages" :key="index" size="small" >
      {{menu.name}}
      <i @click="closeTab(index)" class="el-icon-close el-icon--right"></i>
    </el-button>
  </el-row>
</template>
<script>
import { toRefs, reactive, watch } from 'vue'
export default {
  props:{
    menuPages: Array,
  },
  setup(props, { emit, attrs, slots }) {
    
    let { menuPages } = toRefs(props)

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
</style>