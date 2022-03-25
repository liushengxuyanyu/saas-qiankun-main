import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
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
      // console.log("http.service - token: --->", token)
      config.headers["Authorization"] = getToken()
    } else {
      // 如果没有token或token失效，跳转登录页
      // redirectToPage()
      console.log("[❌ request]: no token or toekn expired.")
    }
    console.log("[❗️ request config]: ", config)
    return config
  },
  (err) => {
    console.error("[❌ axios request]", err)
    return Promise.reject(err)
  }
)

// response interceptor
service.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    if (res.status === 200) {
      console.log("[✅ http.service response] -->", res, res.data)
      return res.data
    } else {
      if (res.status == 401) {
        console.log("[❌ 401:] --------------------->", res.status)
        var protocol = window.location.protocol
        var host = window.location.host
        var targetUrl = protocol + "://" + host + "/web-main/login"
        window.location.replace(targetUrl)
      }

      return Promise.reject(new Error("请求失败!"))
    }
  },

  (err: AxiosError<any>) => {
    console.error("[❌ axios response]", err)
    return Promise.reject(err)
  }
)

export default service
