<template>
  <el-dialog :title="title" v-model="visible" width="400px" :before-close="handleDialogClose" :close-on-click-modal="false">
    <el-form ref="passwordResetFormRef" :model="passwordResetForm" :rules="passwordResetFormRules" size="small" class="password-reset-form">
      <el-form-item prop="mobile">
        <input placeholder="请输入手机号" v-model.trim="passwordResetForm.mobile" class="input" />
      </el-form-item>
      <el-form-item prop="code">
        <div class="input-sms-container">
          <input 
            class="input"
            type="text" 
            maxlength="6"
            placeholder="请输入6位短信验证码"
            v-model.trim="passwordResetForm.code"
          />
          <el-button 
            size="mini" 
            plain
            :class="sendingSMSCode ? 'sms-btn disable' : 'sms-btn'"
            :disabled="sendingSMSCode"
            @click.prevent="handleSendSMSCode(passwordResetForm.mobile)"
          >
            {{ sendingSMSCode ? phoneSendSMSBtnNum : phoneSendSMSBtnText }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item prop="newPassowrd">
        <input placeholder="请输入新密码" type="password" v-model.trim="passwordResetForm.newPassowrd" class="input" />
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <input placeholder="请确认新密码" type="password" v-model.trim="passwordResetForm.confirmPassword" class="input" />
      </el-form-item>
      <el-form-item style="margin-bottom: 10px; padding-top: 30px">
        <button
          style="width: 100%"
          class="reset-button"
          @click.prevent="resetPassword"
        >
          重 置 密 码
        </button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { onMounted, reactive, ref } from "vue"
import { ElMessage } from "element-plus"
import JSEncrypt from "encryptlong"
import { validatePhoneNumber } from "@/utils/validator"
import { sendSMSVerificationCode, resetUserPassword } from "@/api/user"
import { getLocalStorage } from "@/utils/storage"
import { ENCRYPTION_KEY, SMS_COUNTDOWN_SECOUNDS } from "@/common/constants" 

let jsEncrypt = new JSEncrypt()
jsEncrypt.setPublicKey(ENCRYPTION_KEY)

export default {
  name: 'PasswordResetDialog',
  components: {},
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup(props, context) {
    let passwordResetFormRef = ref(null)
    let sendingSMSCode = ref(false)
    let phoneSendSMSBtnNum = ref(SMS_COUNTDOWN_SECOUNDS) // 默认的倒计时记数
    let phoneSendSMSBtnText = ref("获取验证码") // 默认倒计时记数结束后文案
    let passwordResetForm = reactive({
      mobile: '',
      code: '',
      newPassowrd: '',
      confirmPassword: ''
    })
    let countDown = reactive({
      timer: null | undefined
    })
    // 密码强度校验规则
    const PWD_REGEX_RULES = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,20}$/

    const passwordResetFormRules = reactive({
      newPassowrd: [
        {
          validator: (rule, value, callback) => {
            if (value.length > 0) {
              if (PWD_REGEX_RULES.test(value)) {
                if (passwordResetForm.newPassowrd === passwordResetForm.confirmPassword) {
                  callback()
                } else {
                  callback(new Error('两次输入密码不一致!'));
                }
              } else {
                callback(new Error("密码长度8-20，必须包含大小写字母、数字和特殊字符中的三种"))
              }
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
            if (value.length > 0) {
              if (PWD_REGEX_RULES.test(value)) {
                if (passwordResetForm.newPassowrd === passwordResetForm.confirmPassword) {
                  callback()
                } else {
                  callback(new Error('两次输入密码不一致!'));
                }
              } else {
                callback(new Error("密码长度8-20，必须包含大小写字母、数字和特殊字符中的三种"))
              }
            } else {
              callback(new Error("确认密码不能为空!"))
            }
          },
          trigger: 'blur',
        }
      ],
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
          }
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

    onMounted(() => {
     
    })

    const handleDialogClose = () => {
      passwordResetFormRef.value.resetFields()
      context.emit("update:visible", false)
      // 关闭窗口后重置按钮显示
      sendingSMSCode.value = false
      phoneSendSMSBtnNum.value = SMS_COUNTDOWN_SECOUNDS
      phoneSendSMSBtnText.value = "获取验证码"
      clearInterval(countDown.timer) // 清除计时器
    }

    const handleSendSMSCode = async (phoneNum) => {
      passwordResetFormRef.value.validateField("mobile", valid => {
        console.log('[phone number format:]', valid)
      })
      const validatePhoneNum = validatePhoneNumber(phoneNum)
      if (validatePhoneNum) {
        // 执行发送SMS服务的操作
        const query = {
          mobile: passwordResetForm.mobile,
          msgType: 40 // 修改密码时 msgType = 40 ｜ 系统约定
        }
        const res = await sendSMSVerificationCode(query)
        // console.log("res: --->", res)
        if (res.success) {
          ElMessage({
            type: "success",
            message: res.result,
            showClose: true,
            duration: 5000
          })

          // SMS发送成功后开始读秒
          sendingSMSCode.value = true
          phoneSendSMSBtnNum.value = SMS_COUNTDOWN_SECOUNDS
          countDown.timer = setInterval(() => {
            phoneSendSMSBtnNum.value--
            if (phoneSendSMSBtnNum.value === 0) {
              sendingSMSCode.value = false
              phoneSendSMSBtnText.value = "获取验证码"
              clearInterval(countDown.timer)
            }
          }, 1000)
        } else {
          ElMessage({
            type: "error",
            message: res.message,
            showClose: true,
            duration: 5000
          })
        }
      }
    }

    const resetPassword = () => {
      passwordResetFormRef.value.validate(valid => {
        if (valid) {
          let userAccount = getLocalStorage("userAccount")
          if (userAccount) {
            // 点击重置密码
            const data = {
              account: userAccount.replace(/"/g, ""), // 去掉引号
              mobile: passwordResetForm.mobile,
              verifyCode: passwordResetForm.code,
              newPwd: jsEncrypt.encrypt(passwordResetForm.newPassowrd)
            }
            console.log("data: --->", data, passwordResetForm)

            resetUserPassword(data).then(res => {
              console.log("reset password: --->", res)
              if (res.success) {
                ElMessage({
                  type: "success",
                  message: "密码重置成功!", // res.message,
                  showClose: true,
                  duration: 1000
                })  
                // 关闭对话框
                handleDialogClose()
              } else {
                ElMessage({
                  type: "error",
                  message: res.message,
                  showClose: true,
                  duration: 5000
                })
              }
              // passwordResetFormRef.value.resetFields()
              // 由于短信验证码和输入新密码无法清除，需手动重置表单数据
              // passwordResetForm.mobile = ''
              // passwordResetForm.code = ''
              passwordResetForm.newPassowrd = ''
              passwordResetForm.confirmPassword = ''
            })
          } else {
            // ElMessage({
            //   type: "error",
            //   message: "User Account信息为空，请重新登录",
            //   showClose: true,
            //   duration: 5000
            // })
          }
        }
      })
    }

    return {
      sendingSMSCode,
      phoneSendSMSBtnNum,
      phoneSendSMSBtnText,
      passwordResetForm,
      passwordResetFormRef,
      passwordResetFormRules,
      handleDialogClose,
      handleSendSMSCode,
      resetPassword
    }
  }
}
</script>
<style lang="scss" scoped>
.password-reset-form {
  .input {
    box-sizing: border-box;
    outline: none;
    border: none;
    width: 100%;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    border: 1px solid #dcdfe6;
    padding: 14px 20px;
    color: #4a4a4a;
  }

  .input-sms-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .sms-btn {
      text-align: center;
      margin-left: 10px;
      width: 140px;
      height: 32px;
      border: 1px solid #dcdfe6;
      cursor: pointer;
      color: #606266;
      background-color: #F2F3F7;
      font-size: 13px;
      border-radius: 4px;
      
      &.disable {
        color: #999;
        background: #f5f5f5;
        cursor: not-allowed;
      }
    }
  }

  .reset-button {
    border: none;
    width: 100%;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    background: linear-gradient(315deg, #3130f4 0%, #1378ff 100%);
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
  }
}

// 设置input的属性
input::placeholder {
  font-size: 13px;
  color: #95A2B9;
}
</style>