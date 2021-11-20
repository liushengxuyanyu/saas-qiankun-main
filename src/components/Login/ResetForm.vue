<template>
  <div class="page-form-container">
    <div class="form-content">
      <div class="title" @click="goBack">
        <i class="el-icon-back"></i>
        <span style="padding-left: 10px;">忘记密码</span>
      </div>
      <el-form
        ref="pwdResetForm"
        :model="pwdResetForm"
        label-width="0px"
        style="margin-top: 30px"
      >
        <el-form-item style="margin-bottom: 20px">
          <input
            class="input"
            type="text"
            placeholder="请输入手机号"
            v-model.trim="pwdResetForm.phoneNum"
          />
        </el-form-item>
        <el-form-item style="margin-bottom: 20px">
          <input
            class="input"
            type="text"
            autocomplete="new-password"
            placeholder="请输入验证码"
            v-model.trim="pwdResetForm.verficationCode"
          />
        </el-form-item>
        <el-form-item style="margin-bottom: 20px">
          <input
            class="input"
            type="password"
            placeholder="请输入新密码"
            v-model.trim="pwdResetForm.newPassowrd"
          />
        </el-form-item>
        <el-form-item style="margin-bottom: 20px">
          <input
            class="input"
            type="password"
            placeholder="请确认新密码"
            v-model.trim="pwdResetForm.confirmPassword"
          />
        </el-form-item>
        <el-form-item style="margin-bottom: 20px; padding-top: 20px">
          <button
            class="login-button"
            type="button"
          >
            重 置 密 码
          </button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ResetForm',
  data() {
    return {
      pwdResetForm: {
        phoneNum: '',
        verficationCode: '',
        newPassowrd: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/login'
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.page-form-container {
  z-index: 1;
  padding-top: 51px; // 81px;
  width: 520px;
  .form-content {
    width: 420px;
    min-height: 500px;
    background: #fff;
    box-shadow: 0px 2px 16px 2px rgba(239, 240, 244, 0.73);
    border-radius: 24px;
    margin-left: 100px;
    padding: 50px 52px;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: 500;
      padding: 9px 0 16px 0;
      cursor: pointer;
      border-bottom: 2px solid #F2F3F7;
    }

    .input {
      outline: none;
      border: none;
      background-color: #f6f7fa;
      width: 100%;
      height: 48px;
      border-radius: 24px;
      font-size: 14px;
      padding: 14px 20px;
      color: #4a4a4a;
    }

    .verfication-container {
      .code-image {
        position: absolute;
        cursor: pointer;
        top: 5px;
        right: 10px;
      }
    }

    .login-button {
      border: none;
      width: 100%;
      height: 48px;
      line-height: 48px;
      vertical-align: middle;
      background: linear-gradient(315deg, #3130f4 0%, #1378ff 100%);
      border-radius: 24px;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      cursor: pointer;
    }

    .reset-password {
      a {
        font-size: 13px;
        font-weight: bold;
        color: #8d91a8;
        text-decoration: none;
      }
      a:hover {
        color: #1f5afa;
      }
    }
    .reset-password:hover {
      cursor: pointer;
    }
  }
}

// 设置input的属性
input::placeholder {
  color: #8d91a8;
  font-weight: bold;
}

// 重写element ui的tabs样式
::v-deep .el-tabs__nav {
  padding-bottom: 10px;
}
::v-deep .el-tabs__item {
  font-size: 16px;
}
::v-deep .el-tabs__item:hover {
  color: #1f5afa;
}
::v-deep .el-tabs__active-bar {
  background-color: #1f5afa;
}
::v-deep .el-tabs__item.is-active {
  color: #1f5afa;
}
</style>