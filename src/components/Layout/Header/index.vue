<template>
  <div class="header-container">
    <router-link class="logo-img" to="/home">
      <img :src="userInfo.logo" />
    </router-link>
    <div class="userinfo">
      <div v-if="userInfo.showDownloadIcon" class="async-download" @click="handleAsyncDownload">
        <img :src="userInfo.downloadIcon" />
      </div>
      <div class="name">
        {{ userInfo.userName }}
      </div>
      <div class="avatar" @click="handleAvatarClick">
        <!-- <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu class="avatar-dropdown">
              <el-dropdown-item icon="el-icon-lock" command="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="userLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
        <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
        <div v-if="userInfo.showDropdownlist" class="avatar__dropdown-list">
          <ul>
            <li @click="changePassword">
              <el-icon :size="14">
                <key />
              </el-icon>
              <span>修改密码</span>
            </li>
            <li @click="userLogout">
              <el-icon :size="14">
                <unlock />
              </el-icon>
              <span>退出登录</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 对话框部分 -->
    <AsyncDownloadDialog ref="asyncDownloadRef" v-model:visible="asyncDownloadDialog.visible" :title="asyncDownloadDialog.title" />
    <PasswordResetDialog ref="passwordResetRef" v-model:visible="passwordResetDialog.visible" :title="passwordResetDialog.title" />
  </div>
</template>
<script>
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Key, Unlock } from '@element-plus/icons'
import store from '@/store'
import { router } from '@/router'
import Logo from '@/assets/images/logo.svg'
import Avatar from '@/assets/images/avatar.png'
import DownloadIcon from '@/assets/images/download.svg'
import AsyncDownloadDialog from '@/components/Layout/Header/AsyncDownload.vue'
import PasswordResetDialog from '@/components/Layout/Header/PasswordReset.vue'
import { removeToken, removeAllCookies } from "@/utils/auth"
import { getLocalStorage, removeLocalStorage } from "@/utils/storage"

export default {
  components: {
    Key,
    Unlock,
    AsyncDownloadDialog,
    PasswordResetDialog
  },
  setup() {
    let userInfo = reactive({
      logo: Logo,
      avatar: Avatar,
      downloadIcon: DownloadIcon, 
      showDownloadIcon: true,     // 是否展示下载按钮
      userName: "", // 用户名
      showDropdownlist: false
    })

    const asyncDownloadDialog = reactive({
      title: "下载中心",
      visible: false
    })

    const passwordResetDialog = reactive({
      title: "修改密码",
      visible: false
    })

    watch(() => store.state.settings.showDownload, 
      (val) => {
        userInfo.showDownloadIcon = val
      }
    )

    onMounted(() => {
      userInfo.userName = setUserName()
    })

    const setUserName = () => {
      let finalUserName = ""
      const name = getLocalStorage('username')
      if (store.state.user.name) {
        finalUserName = store.state.user.name
      } else {
        if (name) {
          finalUserName = name.slice(1, -1)
        } else {
          finalUserName = '-'
        }
      }

      return finalUserName
    }

    const userLogout = () => {
      ElMessageBox.confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancel-btn',
        confirmButtonClass: 'confirm-btn'
      }).then(() => {
        // 删除对应的ccs-token
        removeToken()
        // 最后保险: 移除所有cookies
        removeAllCookies()

        // 旧代码
        removeLocalStorage("navMenus")
        removeLocalStorage("menuPages")
        // 删除localStorage中的信息
        removeLocalStorage("username")
        removeLocalStorage("isLogin")
        removeLocalStorage("userAccount")

        router.replace({
          path: '/login'
        })
      }).catch (() => {
        ElMessage({
          type: 'info',
          message: `退出登录操作已取消`
        })
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

    // 点击头像
    const handleAvatarClick = () => {
      userInfo.showDropdownlist = !userInfo.showDropdownlist
    }

    const handleAsyncDownload = () => {
      asyncDownloadDialog.visible = !asyncDownloadDialog.visible
    }

    const changePassword = () => {
      passwordResetDialog.visible = !passwordResetDialog.visible
    }

    return {
      userInfo,
      asyncDownloadDialog,
      passwordResetDialog,
      setUserName,
      handleCommand,
      handleAvatarClick,
      handleAsyncDownload,
      changePassword,
      userLogout
    }
  }
}
</script>
<style lang="scss" scoped>
.header-container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  .logo-img {
    display: flex;
    align-items: center;
    img {
      padding: 0 20px;
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

      &__dropdown-list {
        position: absolute;
        background: #fff;
        top: 52px;
        right: 2px;
        padding: 0 15px;
        width: 120px !important;
        height: 96px !important;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        color: #606266;
        ul {
          padding-inline-start: 0;
          li {
            display: flex;
            align-items: center;
            list-style-type: none;
            margin: 0;
            font-size: 14px;
            line-height: 32px;
            span {
              padding-left: 10px;
            }
            &:hover {
              color: #1f5afa;
            }
          }
        }
      }
    }
  }
}

</style>
