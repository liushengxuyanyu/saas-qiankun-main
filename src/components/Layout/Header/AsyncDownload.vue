<template>
  <el-dialog :title="title" v-model="visible" width="80%" :before-close="handleDialogClose">
    <!-- TODO: 添加下载列表 -->
    <section class="list-container">
      testing ...
    </section>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </template>  
  </el-dialog>  
</template>
<script>
import { BUSINESS_LINE_CODES, TASK_STATUS_LIST } from '@/common/constants'

export default {
  name: 'AsyncDownloadDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
  },
  setup() {

    const handleDialogClose = () => {
      console.log('testing ...')
    }
    return {
      handleDialogClose
    }
  }
}
</script>
<style lang="scss" scoped>

</style>