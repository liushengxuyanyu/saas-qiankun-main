/**
 * 增加了获客多SDK后，对不同租户映射不同的userInfo
 * 后续，增加租户后，需要在renant-mapping表里增加对应的映射关系
 */

export const getUserInfoByMapping = () => {
  const host = window.location.host
  let user = {
    uid: "",
    email: "",
    phoneNumber: "",
    name: ""
  }
  for (let item in RENANT_MAPPING) {
    const uid = RENANT_MAPPING[item].uid
    if (uid === host) {
      user = RENANT_MAPPING[item]
    }
  }
  return user
}

export const RENANT_MAPPING = [
  // 本地开发环境
  {
    uid: "localhost:3001",
    name: "本地开发",
    email: "",
    phoneNumber: ""
  },
  // b12 开发环境
  {
    uid: "mryxb12.cloud.dev.missfresh.net",
    name: "零售云-开发环境",
    email: "dev_retail_cloud@missfresh.cn",
    phoneNumber: "18210855751"
  },
  // 测试环境
  {
    uid: "mryx.cloud.test.missfresh.net",
    name: "零售云-测试环境",
    email: "test_retail_cloud@missfresh.cn",
    phoneNumber: "18210855751"
  },
  // 零售-每日拼拼 ｜ 施智峰
  {
    uid: "lingshou.cloud.missfresh.cn", // 暂时没有uid，用url替代
    name: "零售云-每日拼拼",
    email: "shizf01@missfresh.cn",
    phoneNumber: "18210855751"
  }
]
