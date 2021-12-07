<template>
  <div class="page-form-container">
    <el-tabs v-model="activeName" stretch class="login-tabs" @tab-click="handleTabSwitch">
      <el-tab-pane label="账号密码登录" name="first">
        <el-form
          ref="accountLoginFormRef"
          :model="accountLoginForm"
          :rules="accountLoginFormRules"
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
          <el-form-item prop="verficationCode" style="margin-bottom: 20px">
            <div class="verfication-container">
              <input
                class="input"
                placeholder="请输入验证码"
                v-model.trim="accountLoginForm.verficationCode"
                @keyup.enter="accountLogin"
              />
              <img
                v-if="accountLoginForm.base64Code"
                class="code-image"
                :src="accountLoginForm.base64Code"
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
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机号码登录" name="second">
        <el-form 
          ref="phoneLoginFormRef"
          :model="phoneLoginForm"
          :rules="phoneLoginFormRules"
          label-width="0px"
          style="margin-top: 30px"
        >
          <el-form-item prop="mobile" style="margin-bottom: 20px">
            <input
              class="input"
              type="text"
              placeholder="请输入手机号码"
              v-model.trim="phoneLoginForm.mobile"
            />
          </el-form-item>
          <el-form-item prop="code" style="margin-bottom: 20px">
            <input
              class="input code-input"
              placeholder="请输入6位短信验证码" 
              v-model.trim="phoneLoginForm.code"
              maxlength="6"
              @keyup.enter="phoneNumberLogin"
            />
            <div class="vertical-line" />
            <button
              :class="sendingMobileCode ? 'send-code disable' : 'send-code'"
              @click.prevent="sendSMSCode(phoneLoginForm.mobile)"
            >
              {{ phoneSendSMSBtnText }}
            </button>
          </el-form-item>
          <el-form-item style="margin-bottom: 20px; padding-top: 88px;">
            <button
              class="login-button"
              @click.prevent="phoneNumberLogin"
            >
              登 录
            </button>
            <!-- <span class="reset-password">
              <router-link to="/reset">忘记密码</router-link>
            </span> -->
          </el-form-item> 
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { onBeforeMount, reactive, ref } from "vue"
import { ElMessage } from 'element-plus'
import JSEncrypt from "encryptlong"
import { Buffer } from "buffer"
import { getVerificationData, canCreateNewStore, sendSMSVerificationCode } from "@/api/user"
import store from "@/store"
import { router } from "@/router"
import { validatePhoneNumber } from "@/utils/validator"
import { ENCRYPTION_KEY } from "@/common/constants" 

let jsEncrypt = new JSEncrypt()
jsEncrypt.setPublicKey(ENCRYPTION_KEY)

export default {
  name: 'LoginForm',
  setup() {
    // 设置短信接收时间
    const SMS_COUNTDOWN_DURATION = 60

    let activeName = ref("first")
    let timestamp = ref("")
    let accountLoginFormRef = ref(null)

    const accountLoginFormRules = reactive({
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
    })
    // 账号登录
    let accountLoginForm = reactive({
      account: "",
      password: "",
      verficationCode: "",
    })

    let phoneLoginForm = reactive({ mobile: "", code: ""})
    let phoneLoginFormRef = ref(null)
    let phoneSendSMSBtnText = ref("发送验证码")
    let sendingMobileCode = ref(false)

    // 电话号码登录
    const phoneLoginFormRules = reactive({
      mobile: [
        { 
          validator: (rule, value, callback) => {
            const isMatch = validatePhoneNumber(value)
            if (isMatch) {    
              callback()
            } else {
              if (value === "") {
                callback(new Error("手机号码不能为空!"))
              } else {
                callback(new Error("手机号码格式错误!"))
              }
            }
          }, 
          trigger: "blur" 
        }
      ],
      code: [
        {
          validator: (rule, value, callback) => {
            if (value === "") {
              callback(new Error("验证码不能为空!"))
            } else if (value && value.length === 6) {
              callback()
            } else {
              callback(new Error("请输入6位验证码!"))
            }
          },
          trigger: 'blur',
        }
      ]
    })

    onBeforeMount(() => {
      getVerficationCode()
    })

    // 切换 tab pane
    const handleTabSwitch = (tabName) => {
      activeName = tabName.paneName
    }

    const accountLogin = () => {
      accountLoginFormRef.value.validate(valid => {
        if (valid) {
          onSubmit({
            account: accountLoginForm.account,
            password: jsEncrypt.encrypt(accountLoginForm.password),
            code: accountLoginForm.verficationCode,
            randomStr: timestamp
          })
        }
      })
    }

    const onSubmit = async (data) => {
      const res = await store.dispatch("user/login", data)
      if (res.success) {
        ElMessage({
          type: "success",
          message: "登录成功", // res.message,
          showClose: true,
          duration: 1000
        })

        // 检查用户是否能够开店
        const storeInfo = await canCreateNewStore()
        if (storeInfo.code === 200) {
          const stores = storeInfo.result
          if (stores.length > 0) {
            router.push({
              // path: '/home' // 主程序路由
              path: '/helios/portal/portalDoor'
            })
          } else {
            router.push({
              path: '/store/create'
            })
          }
        }
      } else {
        ElMessage({
          type: "error",
          message: res.message,
          showClose: true,
          duration: 3000
        })
        getVerficationCode()
      }

      if (activeName.value === 'first') {
        getVerficationCode()
      }
    }

    /**
     * 查询图片验证码
     */
    const getVerficationCode = async () => {
      timestamp = +new Date()
      const res = await getVerificationData(timestamp)
      let code = Buffer.from(res, "binary").toString("base64")
      console.log("[base64 code]: --->", "data:image/png;base64," + code.replace(/[\r\n]/g, ""))
      accountLoginForm.base64Code = "data:image/png;base64," + code.replace(/[\r\n]/g, "")
    }
    
    /**
     * 发送短信验证码
     */
    const sendSMSCode = (phoneNum) => {
      if (validatePhoneNumber(phoneNum)) {
        sendSMSVerificationCode({
          mobile: phoneLoginForm.mobile,
          msgType: 10 // 系统约定 = 发送短信验证码
        }).then(res => {
          if (res.success) {
            ElMessage({
              type: "success",
              message: res.result,
              showClose: true,
              duration: 3000
            })
            // SMS发送成功后开始读秒
            sendingMobileCode.value = true
            phoneSendSMSBtnText.value = SMS_COUNTDOWN_DURATION

            let timer = setInterval(() => {
              phoneSendSMSBtnText.value--
              if (phoneSendSMSBtnText.value === 0) {
                sendingMobileCode.value = false
                phoneSendSMSBtnText.value = "发送验证码"
                clearInterval(timer)
              }
            }, 1000)
          } else {
            ElMessage({
              type: "error",
              message: res.message,
              showClose: true,
              duration: 3000
            })
          }
        })
      }
    }

    // TODO: 执行手机号登录操作
    const phoneNumberLogin = () => {
      phoneLoginFormRef.value.validate(valid => {
        console.log("phoneNumberLogin --->>", valid, activeName)
        if (valid) {
          onSubmit({
            mobile: phoneLoginForm.mobile,
            code: phoneLoginForm.code
          })
        }
      })
    }

    return {
      accountLoginFormRules,
      accountLoginForm,
      accountLoginFormRef,
      activeName,
      timestamp,
      phoneLoginFormRules,
      phoneLoginForm,
      phoneLoginFormRef,
      phoneSendSMSBtnText,
      handleTabSwitch,
      sendingMobileCode,
      accountLogin, // 账号登录方法
      getVerficationCode,
      sendSMSCode,
      phoneNumberLogin, // 手机号登录方法
    }
  }
}
</script>

<style lang="scss" scoped>
.page-form-container {
  z-index: 1;
  padding-top: 51px; // 81px;
  width: 520px;
  .login-tabs {
    height: 478px;
    background: #fff;
    box-shadow: 0px 2px 16px 2px rgba(239, 240, 244, 0.73);
    border-radius: 24px;
    margin-left: 100px;
    padding: 50px 52px 0 50px;

    .input {
      box-sizing: border-box;
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

    .vertical-line {
      position: absolute;
      width: 1px;
      height: 24px;
      background-color: #e0e0e0;
      left: 210px;
      bottom: 12px;
    }

    .send-code {
      position: absolute;
      left: 220px;
      bottom: 14px; // TODO: 设置为66px，本地显示正常，但测试环境会出问题
      color: #1f5afa;
      border: none;
      background-color: rgba(0, 0, 0, 0);
      cursor: pointer;
      width: 90px;
      text-align: center;

      &.disable {
        color: #999;
        background: #f5f5f5;
        border: none;
        cursor: not-allowed;
      }
    }
  }
}

// 设置input的属性
input::placeholder {
  color: #8d91a8;
  font-weight: bold;
}

// 重写element ui的tabs样式
:deep(.el-tabs__nav) {
  padding-bottom: 10px;
}
:deep(.el-tabs__item) {
  font-size: 16px;
}
:deep(.el-tabs__item:hover) {
  color: #1f5afa;
}
:deep(.el-tabs__active-bar) {
  background-color: #1f5afa;
}
:deep(.el-tabs__item.is-active) {
  color: #1f5afa;
}
</style>
