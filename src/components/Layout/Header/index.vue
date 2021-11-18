<template>
  <div class="header-container">
    <div class="logo-img">
      <img :src="userInfo.logo">
    </div>
    <div class="userinfo">
      <div>
        {{ userInfo.userName }}
      </div>
      <div class="avatar">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-lock" command="resetPassword">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="userLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>  
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessageBox } from 'element-plus'
import Logo from '@/assets/logo.svg'
import Avatar from '@/assets/avatar.svg'
import { reactive } from 'vue'

export default {
  setup() {
    let userInfo = reactive({
      logo: Logo,
      avatar: Avatar,
      userName: "" // 用户名
    })
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
    const handleCommand = (cmd) => {
      console.log("testing ...", cmd)
    }

    return {
      // Logo,
      // Avatar,
      userInfo,
      resetPassword,
      userLogout,
      handleCommand
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