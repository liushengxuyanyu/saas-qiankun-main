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
