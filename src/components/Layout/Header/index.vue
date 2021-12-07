<template>
  <div class="main-header-container">
    <router-link class="main-header-container__logo-img" to="/home">
      <img :src="userInfo.logo" />
    </router-link>
    <div class="main-header-container__userinfo">
      <div v-if="userInfo.showDownloadIcon" class="main-header-container__userinfo__async-download" @click="handleAsyncDownload">
        <img :src="userInfo.downloadIcon" />
      </div>
      <div class="main-header-container__userinfo__name">
        {{ userInfo.userName }}
      </div>
      <div ref="dropdownlistRef" class="main-header-container__userinfo--avatar" @click="handleAvatarClick">
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
        <div v-show="userInfo.showDropdownlist" class="main-header-container__userinfo--avatar__dropdown-list">
          <ul>
            <li @click="changePassword">
              <el-icon :size="14">
                <key />
              </el-icon>
              <span style="width: 100px; min-width: 100px">修改密码</span>
            </li>
            <!-- TODO: 暂时隐藏, 等所有/ccs/login改为/login后开启 -->
            <li @click="userLogout">
              <el-icon :size="14">
                <unlock />
              </el-icon>
              <span style="width: 100px; min-width: 100px">退出登录</span>
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
    let dropdownlistRef = ref(null)
    let passwordResetRef = ref(null)

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
      document.addEventListener("click", toggleDropdownlist)
    })
    
    // 设置用户名称
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

    // click other region 方法，点击其它区域关闭下拉菜单
    const toggleDropdownlist = (e) => {
      const data = dropdownlistRef.value
      if (data) {
        if (!data.contains(e.target)) {
          userInfo.showDropdownlist = false
        }
      }
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
        // removeLocalStorage("userAccount")

        router.push({
          path: '/login'
        }).then(() => {
          // 重新刷新页面
          location.reload()
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
      dropdownlistRef,
      passwordResetRef,
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
.main-header-container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  &__logo-img {
    display: flex;
    align-items: center;
    img {
      padding: 0 20px;
      height: 30px;
    }
  }
  &__userinfo{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    &__async-download {
      margin-right: 10px;
      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
    &__name {
      padding-right: 15px;
      color: #606266;
      font-size: 14px;
      font-weight: bold;
      max-width: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &--avatar{
      height: 36px;
      line-height: 36px;
      cursor: pointer;

      &__dropdown-list {
        display: flex;
        align-items: center;
        position: absolute;
        background: #fff;
        top: 52px;
        right: 2px;
        padding: 0 15px;
        width: 120px;
        min-width: 120px;
        height: 96px;
        // height: 50px;
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
