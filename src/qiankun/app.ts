

let env = 'prod'
export const getApps = () => {
  console.log('============')
  const apps = [
    // {
    //   name: "VueMicroApp",
    //   entry: "//localhost:3002",
    //   container: document.getElementById('frame'),
    //   activeRule: "/web-main/sub-module"
    // },
    {
      name: "heliosHeimdall",
      entry: "/helios/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: "/web-main/helios",
    },
    {
      name: "msAdminSaas",
      entry: "/ms-admin/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: "/web-main/ms-admin",
    },
    {
      name: "saasactivitycenter",
      entry: "/activity/index.html",
      container: document.getElementById('saasactivitycenter'),
      activeRule: "/web-main/activity",
    },
    {
      name: "saastms",
      entry: "/wuliu/tms2/index.html",
      container: document.getElementById('saastms'),
      activeRule: "/web-main/wuliu/tms2",
    },

  ]
  return apps;
};