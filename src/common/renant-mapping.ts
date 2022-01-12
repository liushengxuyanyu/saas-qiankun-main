/**
 * 增加了获客多SDK后，对不同租户映射不同的userInfo
 * 后续，增加租户后，需要在renant-mapping表里增加对应的映射关系
 */

export const getHokdoMapping = () => {
  const host = window.location.host
  let res = {
    uid: "",
    email: "",
    phoneNumber: "",
    name: "",
    country: "",
    province: "",
    city: ""
  }
  for (let item in RENANT_MAPPING) {
    const uid = RENANT_MAPPING[item].uid
    if (uid === host) {
      res = RENANT_MAPPING[item]
    }
  }
  return res
}

export const RENANT_MAPPING = [
  // 本地开发环境
  {
    uid: "localhost:3001",
    name: "本地开发",
    email: "zhongming@missfresh.cn",
    phoneNumber: "18515262579",
    country: "中国",
    province: "北京",
    city: "北京"
  },
  // b12 开发环境
  {
    uid: "mryxb12.cloud.dev.missfresh.net",
    name: "零售云-开发环境",
    email: "dev_retail_cloud@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "北京",
    city: "北京"
  },
  // 测试环境
  {
    uid: "mryx.cloud.test.missfresh.net",
    name: "零售云-测试环境",
    email: "test_retail_cloud@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "北京",
    city: "北京"
  },
  // 零售-每日拼拼 ｜ 施智峰
  {
    uid: "lingshou.cloud.missfresh.cn",
    name: "零售云-每日拼拼",
    email: "shizf01@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "北京",
    city: "北京"
  },
  // --------------------------------------------------
  // 租户列表
  // --------------------------------------------------
  {
    uid: "gmyx.cloud.missfresh.cn",
    name: "国贸优鲜",
    email: "gmyx@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "江苏",
    city: "东台"
  },
  {
    uid: "quanfuyuan.cloud.missfresh.cn",
    name: "全福元优鲜",
    email: "quanfuyuan@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "山东",
    city: "寿光"
  },
  {
    uid: "xlyx.cloud.missfresh.cn",
    name: "小乐优选",
    email: "xlyx@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "山东",
    city: "邹城"
  },
  {
    uid: "jiafujin.cloud.missfresh.cn",
    name: "家福近优鲜",
    email: "jiafujin@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "河南",
    city: "驻马店"
  },
  {
    uid: "jihuasheng.cloud.missfresh.cn",
    name: "吉华盛到家",
    email: "jihuasheng@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "浙江",
    city: "台州"
  },
  {
    uid: "jgcq.cloud.missfresh.cn",
    name: "金港传奇",
    email: "jgcq@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "湖北",
    city: "黄石"
  },
  {
    uid: "jialejia.cloud.missfresh.cn",
    name: "英山家乐福",
    email: "jialejia@missfresh.cn",
    phoneNumber: "18210855751",
    country: "中国",
    province: "湖北",
    city: "黄冈"
  }
]
