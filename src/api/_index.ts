import request from "@/common/http.service"

/**
 * 获取主菜单列表
 * @param {*} params
 * @returns
 */
export function getMenuList(params: any) {
  return request({
    url: "/defender/api/admin/menu/nav",
    method: "GET",
    params
  })
}

/**
 * 记录最近访问菜单，路由切换时触发
 * REF: http://yapi-ops.missfresh.net/project/1724/interface/api/96892
 * @param {*} params
 */
export function recordRouteAccess(data: any) {
  return request({
    url: "/retail-portal/api/page/visit/statistics",
    method: "POST",
    data
  })
}
