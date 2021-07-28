

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
      entry: env == 'test' ? "http://localhost:9001/helios/index.html" : "/helios/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: ["/web-main/helios/"],
    },
    {
      name: "ms-admin",
      entry: "/ms-admin/index.html",
      container: document.getElementById('helios-heimdall'),
      activeRule: ["/web-main/ms-admin/"],
    },
  ]
  return apps;
};