

let env = 'prod'

export const getApps = () => {
  console.log('============')
  let container = document.getElementById('qiankun-sub-container')
  const apps = [
    // 客服系统
    {
      name: "heliosHeimdall",
      entry: "/helios/index.html",
      container,
      activeRule: "/web-main/helios",
    },

    // 营销活动
    {
      name: "msAdminSaas",
      entry: "/ms-admin/index.html",
      container,
      activeRule: "/web-main/ms-admin",
    },

    // 活动中心
    {
      name: "saasactivitycenter",
      entry: "/activity/index.html",
      container,
      activeRule: "/web-main/activity",
    },

    // 物流门店管理
    {
      name: "saastms",
      entry: "/wuliu/tms2/index.html",
      container,
      activeRule: "/web-main/wuliu/tms2",
    },
    // 商品管理
    {
      name: "goods-manage",
      entry: "/goods-manage/index.html",
      container,
      activeRule: "/web-main/goods-manage",
    },

    // 河狸系统
    {
      name: "castorDesigner",
      entry: "/castor/index.html",
      container,
      activeRule: "/web-main/castor",
    },

    // MIS系统
    {
      name: "misAdminSaas",
      entry: "/mis-admin/index.html",
      container,
      activeRule: "/web-main/mis-admin",
    },
  ]
  return apps;
};