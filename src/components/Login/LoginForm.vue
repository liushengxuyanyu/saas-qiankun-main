<template>
  <div class="page-form-container">
    <el-tabs v-model="activeName" @tab-click="handleLoginTabSwitch" stretch class="login-tabs">
      <el-tab-pane label="账号密码登录" name="first">
        <el-form
          ref="accountLoginForm"
          :model="accountLoginForm"
          :rules="accountLoginRules"
          label-width="0px"
          style="margin-top: 30px"
        >
          <el-form-item prop="account" style="margin-bottom: 20px">
            <input
              class="input"
              type="text"
              placeholder="请输入账号"
              v-model.trim="accountLoginForm.account"
            />
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom: 20px">
            <input
              class="input"
              type="password"
              autocomplete="new-password"
              placeholder="请输入登录密码"
              v-model.trim="accountLoginForm.password"
              @keyup.enter="accountLogin"
            />
          </el-form-item>
          <el-form-item prop="verficationCode">
            <div class="verfication-container">
              <input
                class="input"
                placeholder="请输入验证码"
                v-model.trim="accountLoginForm.verficationCode"
                @keyup.enter="accountLogin"
              />
              <img
                v-if="base64Code"
                class="code-image"
                :src="'data:image/png;base64,' + base64Code"
                @click="getVerficationCode"
              />
            </div>
          </el-form-item>
          <el-form-item style="margin-bottom: 20px; padding-top: 20px">
            <button
              class="login-button"
              type="button"
              @keyup.enter="accountLogin"
              @click.prevent="accountLogin"
            >
              登 录
            </button>
            <span class="reset-password" @click="handleResetPassword">
              <router-link to="/reset">忘记密码</router-link>
            </span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机号码登录" name="second"> </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import JSEncrypt from "encryptlong"
import { getVerificationData, canCreateNewStore } from "@/api/user"

let jsEncrypt = new JSEncrypt()
jsEncrypt.setPublicKey(
  `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjnBV+yMC1R31wxb6dNiFWDw53zwRC5bkfna/WUGPcurq8/zJ1rfXk71zggGAslxoZ02d/d/lYFYDCAj2gaWW2CV8hQy82TQNo7ukm3kAfcTDahhZKmm8sdTxxok4xvMYa9tee692FHj23eeIIms0dzsXLxX7X18qhhNvBoezGxn7nPSr3HEc9Pylvoi2x3CjPb1DkIik7wbwBN3eY7oOJn/RSVvpeF/MbdDu+ThwB2mgInVkFeWRpWiSnrfjTk7dFoJdJLwN+JhYkEa4JqLiKRWxt7Vc4o11JHHpMveVwtzzcggCcXSMeOoEjudQDWk5xTl+kiAq7MZ+c4p6p7Kt2QIDAQAB`
)

export default {
  name: 'LoginForm',
  data() {
    return {
      activeName: "first",
      accountLoginRules: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur"
          }
        ],
        verficationCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      // 账户登录表单对象
      accountLoginForm: {
        account: "",
        password: "",
        verficationCode: ""
      },
      timestamp: "", // 随机码(时间戳)
      base64Code: "" // 验证码
    }
  },
  mounted() {
    this.getVerficationCode()
  },
  methods: {
    // 登录方式切换
    handleLoginTabSwitch() {},
    // 账号登录
    accountLogin() {
      this.$refs.accountLoginForm.validate(valid => {
        if (valid) {
          this.onSubmit({
            account: this.accountLoginForm.account,
            password: jsEncrypt.encrypt(this.accountLoginForm.password),
            code: this.accountLoginForm.verficationCode,
            randomStr: this.timestamp
          })
        }
      })
    },
    // 提交登录信息
    async onSubmit(data) {
      const res = await this.$store.dispatch("user/login", data)
      console.log('onSubmit: --->', res)
      /* eslint-disable no-debugger */
      // debugger
      // 提交后，执行刷新验证码操作
      this.getVerficationCode()
      if (res.success) {
        this.$message({
          showClose: true,
          message: "登录成功", // res.message,
          type: "success",
          duration: 1000
        })

        // 检查用户是否能够开店
        const storeInfo = await canCreateNewStore()
        if (storeInfo.code === 200) {
          console.log("storeInfo ---===>>>", storeInfo)
          const stores = storeInfo.result
          if (stores.length > 0) {
            this.$router.push({
              path: '/welcome' // 主程序路由
              // path: '/web-main/helios/portal/portalDoor' // 子项目路由
            })
          } else {
            // 如果门店数量为0，则跳转到创建门店页面
            this.$router.push({
              path: '/store/create'
            })
          }
        }

        // 重置表单信息
        this.$refs["accountLoginForm"].resetFields()

      } else {
        this.accountLoginForm.verficationCode = ""
        this.$message({
          showClose: true,
          message: res.message,
          type: "error"
        })
      }
    },
    // 获取验证码
    async getVerficationCode() {
      this.timestamp = +new Date()
      const res = await getVerificationData(this.timestamp)
      let code = Buffer.from(res, "binary").toString("base64")
      this.base64Code = code
    },
    // 操作重置密码
    handleResetPassword() {}
  }
}
</script>

<style lang="scss" scoped>
.page-form-container {
  z-index: 1;
  padding-top: 51px; // 81px;
  width: 520px;
  .login-tabs {
    width: 420px;
    min-height: 500px;
    background: #fff;
    box-shadow: 0px 2px 16px 2px rgba(239, 240, 244, 0.73);
    border-radius: 24px;
    margin-left: 100px;
    padding: 50px 52px;

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
