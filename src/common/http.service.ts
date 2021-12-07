import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
// import store from "@/store"
import { config } from "@/config"
import { getToken } from "@/utils/auth"

const token = getToken()

const service: AxiosInstance = axios.create({
  baseURL: config.BASE_URL,
  timeout: config.TIMEOUT
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (token) {
      config.headers["Authorization"] = getToken()
    } else {
      // 如果没有token或token失效，跳转登录页
      // redirectToPage()
      console.log("[❌ request]: no token or toekn expired.")
    }

    return config
  },
  (err) => {
    console.error("[❌ axios response]", err)
    return Promise.reject(err)
  }
)

// response interceptor
service.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    if (res.status === 200) {
      return res.data
    } else {
      return Promise.reject(new Error("请求失败!"))
    }
  },

  (err) => {
    console.error("[❌ axios response]", err)
    return Promise.reject(err)
  }
)

export default service
