<template>
  <el-dialog :title="title" v-model="visible" width="25%" :before-close="handleDialogClose">
    <el-form ref="passwordResetFormRef" :model="passwordResetForm" :rules="passwordResetFormRules" size="small" class="password-reset-form">
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model.trim="passwordResetForm.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <div class="input-sms-container">
          <el-input placeholder="请输入6位短信验证码" v-model.trim="passwordResetForm.code"></el-input>
          <!-- <button :class="sendingSMSCode ? 'sms-btn disable' : 'sms-btn'" @click="handleSendSMSCode">{{ phoneSendSMSBtnText }}</button> -->
          <div :class="sendingSMSCode ? 'sms-btn disable' : 'sms-btn'" @click="handleSendSMSCode">{{ phoneSendSMSBtnText }}</div>
        </div>
      </el-form-item>
      <el-form-item prop="newPassowrd">
        <el-input placeholder="请输入新密码" v-model.trim="passwordResetForm.newPassowrd"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input placeholder="请确认新密码" v-model.trim="passwordResetForm.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 20px; padding-top: 20px">
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
import { reactive, ref } from "vue"
import { ElMessage } from 'element-plus'
import { validatePhoneNumber } from "@/utils/validator"
import { sendSMSVerificationCode } from '@/api/user'

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
    let sendingSMSCode = ref(false)
    let phoneSendSMSBtnText = ref("获取验证码")
    let passwordResetForm = reactive({
      mobile: '',
      code: '',
      newPassowrd: '',
      confirmPassword: ''
    })

    const passwordResetFormRules = reactive({
      mobile: [
        {
          validator: (rule, value, callback) => {
            const isMatch = validatePhoneNumber(value)
            if (isMatch) {
              // 执行发送SMS服务的操作
              const query = {
                mobile: passwordResetForm.mobile,
                msgType: 40 // 修改密码时 msgType = 40 ｜ 系统约定
              }

              sendSMSVerificationCode(query).then(res => {
                if (res.success) {

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
        }
      ]
    })

    const handleDialogClose = () => {
      context.emit("update:visible", false)
    }

    const handleSendSMSCode = () => {
      // console.log('testing ...')
      // passwordResetFormRef.value.validateField("mobile", (valid) => {
      //   console.log('[phone number format:]', valid)
      // })
    }

    const resetPassword = () => {

    }

    return {
      sendingSMSCode,
      phoneSendSMSBtnText,
      passwordResetForm,
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
      background-color: #fff;
      font-size: 13px;
      border-radius: 4px;
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
</style>