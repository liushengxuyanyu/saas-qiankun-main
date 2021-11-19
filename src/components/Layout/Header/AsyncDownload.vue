<template>
  <el-dialog :title="title" v-model="visible" width="80%" :before-close="handleDialogClose">
    <!-- TODO: 添加下载列表 -->
    <section class="list-container">
      <el-table :data="dataList" height="400px" style="width: 100%" v-loading="loading" size="mini">
        <el-table-column
          prop="id"
          label="任务ID"
          width="80"
          align="center"
          fixed="left"
        />
        <el-table-column
          prop="configId"
          label="配置ID"
          width="80"
          align="center"
        />
        <el-table-column
          prop="businessLineCode"
          label="系统名称"
          width="100"
          align="center"
        />
        <el-table-column
          prop="typeName"
          label="报表类型"
          width="160"
          align="center"
          sortable="true"
        />
        <el-table-column
          prop="fileName"
          label="报表名称"
          width="140"
          align="center"
        />
        <el-table-column
          prop="dataCount"
          label="数据量"
          width="100"
          align="center"
        />
        <el-table-column
          prop="taskBeginTime"
          label="任务创建时间"
          width="160"
          align="center"
        />
        <el-table-column
          prop="taskEndTime"
          label="任务完成时间"
          width="160"
          align="center"
        />
        <el-table-column
          prop="taskStatus"
          label="任务完成状态"
          width="120"
          align="center"
        />
        <el-table-column
          prop="failureMessage"
          label="失败原因"
          align="center"
        />
        <el-table-column label="操作" width="80" align="center" fixed="right">
          <template #default>
            <el-button size="mini" type="text" @click="download(scope.row)">下载</el-button>
          </template>  
        </el-table-column> 
      </el-table>  
    </section>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleDialogClose">关闭</el-button>
      </span>
    </template>  
  </el-dialog>  
</template>
<script>
import { BUSINESS_LINE_CODES, TASK_STATUS_LIST } from '@/common/constants'
// import { reactive } from 'vue'

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
  setup(props, context) {
    const handleDialogClose = () => {
      context.emit("update:visible", false)
    }

    return {
      handleDialogClose
    }
  }
}
</script>
<style lang="scss" scoped>

</style>