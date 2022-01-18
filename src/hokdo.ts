/**
 * 引入 - 获客多 相关的SDK
 * 文档：https://huokeduo.feishu.cn/docs/doccnVIbjWZNAuxP6sjTdQrGROg#umCH1Z
 * token 若失效，请联系 - shizf01@missfresh.cn
 * https://app.hokdo.com/user
 */
import Hokdo from "@hokdo/core"
import { getHokdoMapping } from "./common/renant-mapping"
import { getLocalStorage } from "./utils/storage"

const HOKDO_TOKEN = "c56263d13f8c51bb247bdcd79213b98e"

export const hokdoInit = () => {
  const hokdo = getHokdoMapping()
  const userAccount = getLocalStorage("userAccount")
  const userName = getLocalStorage("username")
  // console.log("userAccount, userName: --->", userAccount, userName)

  Hokdo.init(HOKDO_TOKEN, {
    // userInfo: {
    //   uid: user.uid,
    //   email: user.email,
    //   phoneNumber: user.phoneNumber,
    //   name: user.name
    // }
    personInfo: {
      id: userAccount ? userAccount.replace(/"/g, "") : "",
      fullName: userName ? userName.replace(/"/g, "") : ""
    },
    organizationInfo: {
      id: hokdo.uid,
      name: hokdo.name,
      country: hokdo.country,
      province: hokdo.province,
      city: hokdo.city
    }
  })
}
