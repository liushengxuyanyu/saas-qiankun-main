import request from "@/common/http.service"

/**
 * 下载页面获取报表类型
 * @returns
 */
export function fetchReportTypes() {
  return request({
    url: "/download/api/config/all_type_name",
    method: "GET"
  })
}

export function fetchDownloadList(params: any) {
  return request({
    url: "/download/api/task/",
    method: "GET",
    params: params
  })
}

/**
 * 下载EXCEL文件接口
 * @param url
 * @param data
 * @returns
 */
export function donwloadExcelFile(url: string, data: any) {
  return request({
    url: url,
    method: "POST",
    responseType: "blob",
    timeout: 300000,
    data: data
  })
}
