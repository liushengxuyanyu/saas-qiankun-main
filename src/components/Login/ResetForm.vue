<template>
  <div class="page-form-container">
    <div class="form-content">
      <div class="title" @click="goBack">
        <i class="el-icon-back"></i>
        <span style="padding-left: 10px;">忘记密码</span>
      </div>
      <el-form
        ref="pwdResetFormRef"
        :model="pwdResetForm"
        :rules="pwdResetFormRules"
        label-width="0px"
        style="margin-top: 30px"
      >
        <el-form-item prop="mobile" style="padding-top: 14px; margin-bottom: 20px">
          <input
            class="input"
            type="text"
            placeholder="请输入手机号"
            v-model.trim="pwdResetForm.mobile"
          />
        </el-form-item>
        <el-form-item prop="verficationCode" style="margin-bottom: 20px">
          <input
            class="input"
            type="text"
            autocomplete="new-password"
            placeholder="请输入6位短信验证码"
            v-model.trim="pwdResetForm.verficationCode"
          />
          <div class="vertical-line" />
          <button
            :class="sendingMobileCode ? 'send-code disable' : 'send-code'"
            @click.prevent="sendSMSCode(pwdResetForm.mobile)"
          >
            {{ phoneSendSMSBtnText }}
          </button> 
        </el-form-item>
        <el-form-item prop="newPassowrd" style="margin-bottom: 20px">
          <input
            class="input"
            type="password"
            placeholder="请输入新密码"
            v-model.trim="pwdResetForm.newPassowrd"
          />
        </el-form-item>
        <el-form-item prop="confirmPassword" style="margin-bottom: 20px">
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
            @click.prevent="resetPassword"
          >
            重 置 密 码
          </button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue"
import { ElMessage } from 'element-plus'
import JSEncrypt from "encryptlong"
import { sendSMSVerificationCode } from "@/api/user"
import { router } from "@/router"
import { validatePhoneNumber } from "@/utils/validator"

let jsEncrypt = new JSEncrypt()
jsEncrypt.setPublicKey(
  `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjnBV+yMC1R31wxb6dNiFWDw53zwRC5bkfna/WUGPcurq8/zJ1rfXk71zggGAslxoZ02d/d/lYFYDCAj2gaWW2CV8hQy82TQNo7ukm3kAfcTDahhZKmm8sdTxxok4xvMYa9tee692FHj23eeIIms0dzsXLxX7X18qhhNvBoezGxn7nPSr3HEc9Pylvoi2x3CjPb1DkIik7wbwBN3eY7oOJn/RSVvpeF/MbdDu+ThwB2mgInVkFeWRpWiSnrfjTk7dFoJdJLwN+JhYkEa4JqLiKRWxt7Vc4o11JHHpMveVwtzzcggCcXSMeOoEjudQDWk5xTl+kiAq7MZ+c4p6p7Kt2QIDAQAB`
)

export default {
  name: 'ResetForm',
  setup() {
    let pwdResetFormRef = ref(null)
    let sendingMobileCode = ref(false)
    let phoneSendSMSBtnText = ref("发送验证码")
    
    let pwdResetForm = reactive({
      mobile: '',
      code: '',
      newPassowrd: '',
      confirmPassword: ''
    })
  
    const pwdResetFormRules = reactive({
      mobile: [
        {
          validator: (rule, value, callback) => {
            const isMatch = validatePhoneNumber(value)
            console.log("isMatch: --->", isMatch)
            if (isMatch) {
              // 执行发送SMS服务的操作
              const query = {
                mobile: pwdResetForm.mobile,
                msgType: 40 // 修改密码时 msgType = 40 ｜ 系统约定
              }
              sendSMSVerificationCode(query).then(res => {
                if (res.success) {
                  ElMessage({
                    type: "success",
                    message: res.result,
                    showClose: true,
                    duration: 3000
                  })

                  // SMS发送成功后开始读秒
                  sendingMobileCode.value = true
                  phoneSendSMSBtnText.value = 60

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
      verficationCode: [
        {
          validator: (rule, value, callback) => {
            console.log("code: --->", value)
            if (value) {
              if (value.length < 6) {
                callback(new Error("请输入6位验证码!"))
              }
            } else {
              callback(new Error("验证码不能为空!"))
            }
          },
          trigger: 'blur',
        }
      ],
      newPassowrd: [
        {
          validator: (rule, value, callback) => {
            console.log("newPassowrd: --->", value)
            if (value) {
              // if (value.length < 6) {
              //   callback(new Error("新密码强度不够!"))
              // }
            } else {
              callback(new Error("新密码不能为空!"))
            }
          },
          trigger: 'blur',
        }
      ],
      confirmPassword: [
        {
          validator: (rule, value, callback) => {
            console.log("code: --->", value)
            if (value) {
              // TODO: add validation
            } else {
              callback(new Error("确认密码不能为空!"))
            }
          },
          trigger: 'blur',
        }
      ]
    })
    
    const goBack = () => {
      router.push({
        path: '/login'
      })
    }

    const sendSMSCode = (phoneNum) => {
      console.log("SMS code for reset password: --->", phoneNum)
      pwdResetFormRef.value.validateField("mobile", (valid) => {
        console.log('[phone number format:]', valid)
      })
    }

    const resetPassword = () => {
      console.log("点击重置密码按钮")
      pwdResetFormRef.value.validate((valid) => {
        if (valid) {

        }
      })
    }

    return {
      pwdResetFormRef,
      pwdResetForm,
      pwdResetFormRules,
      phoneSendSMSBtnText,
      sendingMobileCode,
      goBack,
      sendSMSCode,
      resetPassword
    }
  }
}
</script>
<style lang="scss" scoped>
.page-form-container {
  z-index: 1;
  padding-top: 51px; // 81px;
  width: 520px;
  .form-content {
    // width: 420px;
    // min-height: 500px;
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
      padding: 0 0 20px 0;
      cursor: pointer;
      border-bottom: 2px solid #e4e7ed;
    }

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
      width: 80px;
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