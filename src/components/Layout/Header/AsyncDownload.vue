<template>
  <el-dialog :title="title" v-model="visible" width="80%" :before-close="handleDialogClose">
    <section class="search-container">
      <el-form :inline="true" ref="searchFormRef" :model="searchForm" size="mini">
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">查询</el-button>
          <el-button type="default" size="mini" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item label="系统名称" prop="businessLineCode">
          <el-select v-model="searchForm.businessLineCode" placeholder="全部" clearable style="width: 150px">
            <el-option
              v-for="(item, index) in systemCodeList"
              :key="index"
              :value="item.code"
            >
              {{ item.code }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报表类型" prop="typeName">
          <el-select v-model="searchForm.typeName" placeholder="全部" clearable style="width: 150px">
            <el-option
              v-for="(item, index) in reportTypeList.list"
              :key="index"
              :value="item.type"
            >
              {{ item.type }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报表名称" prop="fileName">
          <el-input v-model="searchForm.fileName" style="width: 150px" placeholder="请输入报表名称"></el-input>
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
      <el-table v-loading="tableData.loading" :data="tableData.list" size="mini" height="400px" style="width: 100%;" :header-cell-style="{ background: '#f3f6fa'}">
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
          width="120"
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
        >
        </el-table-column>
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
          <template v-slot="scope">
            <el-button v-if="scope.row.downloadUrl" size="mini" type="text" @click="downloadFile(scope.row)">下载</el-button>
          </template>  
        </el-table-column> 
      </el-table>
      <section class="pagination-section">
        <el-config-provider :locale="locale">
          <el-pagination 
            small 
            layout="total, prev, pager, next, sizes, jumper" 
            :total="50"
            :current-page="pagination.page"
            :page-size="pagination.limit"
            @size-change="onPageSizeChanged"
            @current-change="onCurrentPageChanged"
          />
        </el-config-provider>  
      </section>
      
    </section>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" size="small" @click="handleDialogClose">关闭</el-button>
      </span>
    </template>  
  </el-dialog>  
</template>
<script>
import { onMounted, reactive, ref } from "vue"
import { ElConfigProvider, ElMessage } from "element-plus"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import { fetchReportTypes, fetchDownloadList, donwloadExcelFile } from "@/api/download"
import { BUSINESS_LINE_CODES, TASK_STATUS_LIST } from "@/common/constants"
import dayjs from "dayjs"

export default {
  name: 'AsyncDownloadDialog',
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
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
    let locale = zhCn
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
      businessLineCode: '', // 系统名称 systemName
      typeName: '', // 报表类型 reportType
      fileName: '', // 报表名称 reportName
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
      tableData.loading = true
      const res = await fetchDownloadList(params)
      if (res.code === 200) {
        tableData.list = res.result.list
        let rawData = res.result.list
        let finalData = []
        let item = Object.assign({})
        
        rawData.forEach((data) => {
          item = {
            id: data.id,
            configId: data.configId,
            businessLineCode: data.businessLineCode,
            typeName: data.typeName,
            fileName: data.fileName,
            downloadUrl: data.downloadUrl,
            dataCount: data.dataCount,
            taskBeginTime: dayjs(data.taskBeginTime).format("YYYY-MM-DD hh:mm:ss"),
            taskEndTime: dayjs(data.taskEndTime).format("YYYY-MM-DD hh:mm:ss"),
            taskStatus: _parseTaskStatus(data.taskStatus),
            failureMessage: data.failureMessage || '-' // 失败原因
          }
          finalData.push(item)
        })
        tableData.list = finalData
        tableData.loading = false
      }
    }

    const _parseTaskStatus = (status) => {
      let res = ""
      TASK_STATUS_LIST.forEach(s => {
        if (s.value.toString() == status) {
          res = s.label
        }
      })
      return res
    }

    const handleSearch = async () => {
      let params = {}

      Object.keys(searchForm).forEach((key) => {
        if (searchForm[key]) {
          params[key] = searchForm[key]
        }
      })

      const query = Object.assign({}, params, pagination)
      console.log("query --->", query)
      getDownloadList(query)
    }

    const handleReset = () => {
      // console.log('reset search ...', searchFormRef.value.resetFields)
      searchFormRef.value.resetFields()
      handleSearch()
    }

    const onPageSizeChanged = (size) => {
      pagination.limit = size
      handleSearch()
    }

    const onCurrentPageChanged = (page) => {
      pagination.page = page
      handleSearch()
    }

    const downloadFile = async (item) => {
      const res = await donwloadExcelFile(item.downloadUrl, {})
      console.log("download file: --->", res)
      if (res instanceof Blob) {
        let blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob);
        link.download = item.fileName + dayjs().format("YYYYMMDDHHmmss") + ".xls"
        document.body.appendChild(link)
        link.click()
        link.remove()
        ElMessage({
          type: "success",
          message: "导出文件成功！",
          showClose: true,
          duration: 1000
        })
      } else {
        ElMessage({
          type: "error",
          message: "导出文件失败！",
          showClose: true,
          duration: 3000
        })
      }
    }

    const handleDialogClose = () => {
      context.emit("update:visible", false)
      searchFormRef.value.resetFields()
    }

    return {
      locale,
      searchFormRef, // ref 类型
      tableData,
      pagination, // 分页设置
      searchForm,
      reportTypeList,
      taskStatusList,
      systemCodeList,
      getDownloadList,
      getReportTypes,
      handleSearch,
      handleReset,
      onPageSizeChanged,
      onCurrentPageChanged,
      downloadFile,
      handleDialogClose
    }
  }
}
</script>
<style lang="scss" scoped>
.search-container {
  .search-form {
    font-size: 13px;
  }
}

.list-container {
  display: flex;
  flex-direction: column;
  .pagination-section {
    padding-top: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  :deep(.el-table__header) {
    font-size: 13px;
  }
  :deep(.el-table__row) {
    font-size: 13px;
    color: #222c3d;
  }
}
</style>