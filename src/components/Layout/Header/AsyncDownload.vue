<template>
  <el-dialog :title="title" v-model="visible" width="80%" :before-close="handleDialogClose">
    <section class="search-container">
      <el-form :inline="true" ref="searchFormRef" :model="searchForm" size="mini">
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">查询</el-button>
          <el-button type="default" size="mini" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item label="系统名称" prop="systemName">
          <el-select v-model="searchForm.systemName" placeholder="全部" clearable style="width: 150px">
            <el-option
              v-for="(item, index) in systemCodeList"
              :key="index"
              :value="item.code"
            >
              {{ item.code }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报表类型" prop="reportType">
          <el-select v-model="searchForm.reportType" placeholder="全部" clearable style="width: 150px">
            <el-option
              v-for="(item, index) in reportTypeList.list"
              :key="index"
              :value="item.type"
            >
              {{ item.type }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报表名称" prop="reportName">
          <el-input v-model="searchForm.reportName" style="width: 150px" placeholder="请输入报表名称"></el-input>
        </el-form-item>
        <el-form-item label="任务状态" prop="taskStatus">
          <el-select v-model="searchForm.taskStatus" placeholder="全部" clearable style="width: 150px">
            <el-option
              v-for="(item, index) in taskStatusList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>  
    </section>
    <!-- 下载列表 -->
    <section class="list-container">
      <el-table v-loading="tableData.loading" :data="tableData.list" size="mini" height="400px" style="width: 100%;">
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
import { onMounted, reactive, ref } from "vue"
import { fetchReportTypes, fetchDownloadList } from "@/api/download"
import { BUSINESS_LINE_CODES, TASK_STATUS_LIST } from "@/common/constants"

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
  // props 不能去掉
  setup(props, context) {
    let searchFormRef = ref(null)
        
    let reportTypeList = reactive({
      list: []
    })

    let tableData = reactive({
      loading: false,
      list: []
    })

    let pagination = reactive({
      page: 1,
      limit: 10
    })

    let searchForm = reactive({
      systemName: '', // 系统名称
      reportType: '', // 报表类型
      reportName: '', // 报表名称
      taskStatus: ''  // 任务状态
    })

    const taskStatusList = TASK_STATUS_LIST
    const systemCodeList = BUSINESS_LINE_CODES

    onMounted(() => {
      getReportTypes()
      getDownloadList()
    })

    const getReportTypes = async () => {
      let reportTypes = []
      const res = await fetchReportTypes()
      if (res.code === 200) {
        const tmpArr = res.result || []
        tmpArr.forEach((item, index) => {
          if (item === "") {
            // reportTypes.push({
            //   index,
            //   type: "全部"
            // })
          } else {
            reportTypes.push({
              index,
              type: item
            })
          }
        })
        reportTypeList.list = reportTypes
      }
    }

    const getDownloadList = async (params) => {
      const res = await fetchDownloadList(params)
      if (res.code === 200) {
        tableData.list = res.result.list
      }
    }

    const handleSearch = async (params) => {
      getDownloadList(params)
    }

    const handleReset = () => {
      // console.log('reset search ...', searchFormRef.value.resetFields)
      searchFormRef.value.resetFields()

    }
    const handleDialogClose = () => {
      context.emit("update:visible", false)
      searchFormRef.value.resetFields()
    }

    return {
      searchFormRef, // ref 类型
      tableData,
      pagination, // 分页设置
      searchForm,
      reportTypeList,
      taskStatusList,
      systemCodeList,
      getReportTypes,
      getDownloadList,
      handleSearch,
      handleReset,
      handleDialogClose
    }
  }
}
</script>
<style lang="scss" scoped>
.search-container {
  .search-form {
    // font-size: 13px;
    .testing {
      font-size: 13px;
    }
  }
}

.list-container {
  :deep(.el-table__header) {
    font-size: 13px;
  }
  :deep(.el-table__row) {
    font-size: 13px;
    color: #222c3d;
  }
}
</style>