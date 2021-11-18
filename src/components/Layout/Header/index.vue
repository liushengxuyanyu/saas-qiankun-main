<template>
  <div class="header-container">
    <div class="logo-img">
      <img :src="userInfo.logo">
    </div>
    <div class="userinfo">
      <div class="async-download">
        <img :src="userInfo.downloadIcon" />
      </div>
      <div class="name">
        {{ userInfo.userName }}
      </div>
      <div class="avatar">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-lock" command="changePassword">修改密码</el-dropdown-item>
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
import DownloadIcon from '@/assets/download.svg'
import { reactive } from 'vue'

export default {
  setup() {
    let userInfo = reactive({
      logo: Logo,
      avatar: Avatar,
      downloadIcon: DownloadIcon,
      userName: "假的用户名" // 用户名
    })

    const asyncDownloadDialog = reactive({
      title: "下载中心",
      visible: false
    })
    const changePwdDialog = reactive({
      title: '修改密码',
      visible: false
    })

    const userLogout = () => {
      ElMessageBox.confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // window.location.href = `${location.origin}/ccs/login?ret=${encodeURIComponent(window.location.href)}`
      })
    }

    const handleCommand = (cmd) => {
      switch (cmd) {
        case 'changePassword':
          changePassword()
          break;
        case 'userLogout':
          userLogout()
          break;
        default:
          break;
      }
    }

    const handleAsyncDownload = () => {
      console.log('处理异步下载对话框')
      asyncDownloadDialog.visible = !asyncDownloadDialog.visible
    }

    const changePassword = () => {
      console.log('修改密码')
      changePwdDialog.visible = !changePwdDialog.visible
    }

    return {
      userInfo,
      asyncDownloadDialog,
      changePwdDialog,
      handleCommand,
      handleAsyncDownload,
      userLogout,
      changePassword
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
    .async-download {
      margin-right: 10px;
      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
        // &:hover {
        //   color: red;
        // }
      }
    }
    .name {
      padding-right: 15px;
      color: #606266;
      font-size: 14px;
      font-weight: bold;
      max-width: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
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
