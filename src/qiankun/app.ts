

let env = 'prod'

export const getApps = () => {
  console.log('============')
  let container = document.getElementById('helios-heimdall')
  const apps = [
    // {
    //   name: "VueMicroApp",
    //   entry: "//localhost:3002",
    //   container: document.getElementById('frame'),
    //   activeRule: "/web-main/sub-module"
    // },
    // 客服系统
    {
      name: "heliosHeimdall",
      entry: "/helios/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: "/web-main/helios",
    },

    // 营销活动
    {
      name: "msAdminSaas",
      entry: "/ms-admin/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: "/web-main/ms-admin",
    },

    // 活动中心
    {
      name: "saasactivitycenter",
      entry: "/activity/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: "/web-main/activity",
    },

    // 物流门店管理
    {
      name: "saastms",
      entry: "/wuliu/tms2/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: "/web-main/wuliu/tms2",
    },
    // 商品管理
    {
      name: "goods-manage",
      entry: "/goods-manage/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: "/web-main/goods-manage",
    },

    // 河狸系统
    {
      name: "castorDesigner",
      entry: "/castor/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: "/web-main/castor",
    },
  ]
  return apps;
};