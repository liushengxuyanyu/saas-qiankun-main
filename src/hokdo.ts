/**
 * 引入 - 获客多 相关的SDK
 * 文档：https://huokeduo.feishu.cn/docs/doccnVIbjWZNAuxP6sjTdQrGROg#umCH1Z
 * token 若失效，请联系 - shizf01@missfresh.cn
 * https://app.hokdo.com/user
 */
import Hokdo from "@hokdo/core"
import { getUserInfoByMapping } from "./common/renant-mapping"

const HOKDO_TOKEN = "c56263d13f8c51bb247bdcd79213b98e"

export const hokdoInit = () => {
  const user = getUserInfoByMapping()

  Hokdo.init(HOKDO_TOKEN, {
    userInfo: {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name
    }
  })
}
