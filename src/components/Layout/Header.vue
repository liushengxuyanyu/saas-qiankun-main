<template>
  <div class="header-tmpl">
    <div class="logo">
      <div class="logo-img"><img :src="Logo"></div>
    </div>
    <div class="userinfo">
      <div class="avatar">
        <el-avatar size="medium" :src="circleUrl"></el-avatar>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from 'vue'
import Logo from '@/assets/mryx_lsy.png'
export default {
  setup() {
     return {
       Logo,
       circleUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
     }
   }
}
</script>
<style lang="less" scoped>
.header-tmpl{
  height: 50px;
  display: flex;
  .logo{
    padding: 11px 0 0 20px;
    width: 300px;
    .logo-img img{
      width: 104px ;
    }
  }
  .userinfo{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    .avatar{
      height: 36px;
      line-height: 36px;
    }
  }
}
</style>