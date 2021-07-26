
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
      activeRule: ["/web-main/helios/"],
    },
  ]
  return apps;
};