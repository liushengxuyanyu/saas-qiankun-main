<template>
  <div class="header-container">
    <div class="logo-img">
      <img :src="Logo">
    </div>
    <div class="userinfo">
      <div class="avatar">
        <el-popover
          placement="bottom-end"
          :width="80"
          trigger="click"
          :append-to-body="false"
        >
          <template #reference>
            <el-avatar size="medium" :src="circleUrl"></el-avatar>
          </template>
          <ul class="action-list" id="ActionList">
            <li>
              <a @click="resetPassword">修改密码</a>
            </li>
            <li>
              <a @click="userLogout">用户退出</a>
            </li>
          </ul>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessageBox } from 'element-plus'
import Logo from '@/assets/logo.svg'

export default {
  setup() {
    const resetPassword = () => {
      window.location.href = `${location.origin}/ccs/reset?ret=${encodeURIComponent(window.location.href)}`
    }
    const userLogout = () => {
      ElMessageBox.confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.href = `${location.origin}/ccs/login?ret=${encodeURIComponent(window.location.href)}`
      })
    }
    return {
      Logo,
      circleUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      resetPassword,
      userLogout
    }
  }
}
</script>
<style lang="less" scoped>
.header-container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  .logo-img {
    display: flex;
    align-items: center;
    img {
      padding: 0 10px;
      height: 30px;
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
      cursor: pointer;
    }
    .action-list, li{
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
}
</style>