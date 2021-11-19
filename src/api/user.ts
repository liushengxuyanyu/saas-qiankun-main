import request from "@/common/http.service"

/**
 * 登录
 * @param {*} data
 * @returns
 */
 export function login(data: any) {
  return request({
    url: "/ccs/api/saas/login",
    method: "POST",
    data
  })
}

/**
 * 登出
 * TODO: 需要和后端对齐，目前暂未使用
 * @returns
 */
 export function logout() {
  return request({
    url: "",
    method: "POST"
  })
}

/**
 * 获取登录验证码
 * @param {*} timestamp
 * @returns
 */
 export function getVerificationData(timestamp: string) {
  return request({
    url: `/ccs/api/saas/captcha/${timestamp}`,
    method: "GET",
    responseType: "arraybuffer"
  })
}

/**
 * 判断用户是否开店
 * @returns boolean 开店 true ｜ 未开店 false
 */
 export function canCreateNewStore() {
  return request({
    url: "/tms/api/tms/base/getUCanSeeStations",
    method: "POST"
  })
}