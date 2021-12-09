import { removeToken } from "@/utils/auth"
import service from "./index"

export const menusRoot = () => {
  return service
    .get("/defender/api/admin/menu/root", {
      params: {
        platform: "ROOT",
        systemId: "10408"
      }
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const menus = () => {
  let navMenus = localStorage.getItem("navMenus")
  if (navMenus) {
    try {
      let menus = JSON.parse(navMenus)
      return Promise.resolve(menus)
    } catch {
      console.log("JSON.parse(navMenus)")
    }
  }

  return service
    .get("/defender/api/admin/menu/nav", {
      params: {
        platform: "ROOT",
        systemId: "10408",
        website: "lingshouyun_pc"
      }
    })
    .then((res) => {
      console.log("res: --->", res)
      localStorage.setItem("navMenus", JSON.stringify(res.data))
      return res.data
    })
    .catch((err) => {
      console.log("menu error: --->", err.toString())
      let errStr = err.toString()
      console.log(errStr.includes("401"))

      // 在旧代码里增加401的判断逻辑，如果401，则返回登录页
      if (errStr.includes("401")) {
        removeToken()
        // location.reload()
        window.location.href = `${location.origin}/web-main/login?ret=${encodeURIComponent(
          window.location.href
        )}`
      }
    })
}

export const pageVisit = (data) => {
  return service
    .post("/retail-portal/api/page/visit/statistics", data)
    .then((res) => {
      return res.data
    })
    .catch((err) => {})
}
