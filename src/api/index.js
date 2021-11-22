import axios from "axios"
import { ElMessageBox as MessageBox } from "element-plus"
import store from "@/store"
import { getToken } from "@/utils/auth"
import { BASE_API, TIMEOUT } from "@/config"

// create an axios instance
const service = axios.create({
  baseURL: BASE_API, // api 的 base_url
  timeout: TIMEOUT // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = getToken()
      config.headers["token"] = getToken()
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    let status = error.response.status
    let code = error.response.data.code
    if (status == "401" || code == "401") {
      // logout()
    }
    return Promise.reject(error)
  }
)

// function logout() {
//   MessageBox.confirm(
//     "你已被登出，可以取消继续留在该页面，或者重新登录",
//     "确定登出", {
//       confirmButtonText: "重新登录",
//       cancelButtonText: "取消",
//       type: "warning"
//     }
//   ).then(() => {
//     // store.dispatch("FedLogOut").then(() => {
//     //   window.location.href = `${location.origin}/ccs/login?ret=${encodeURIComponent(window.location.href)}`
//     // })
//   })
// }

export default service
