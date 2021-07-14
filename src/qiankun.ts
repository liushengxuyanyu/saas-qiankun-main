import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
} from "qiankun"


/**
 * 注册微应用
 * 第一个参数 - 微应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
export const startQK = start;
export const register = () => {
    registerMicroApps([
      {
        name: "VueMicroApp",
        entry: "//localhost:3002",
        container: document.getElementById('frame'),
        activeRule: "#/sub-module",
        props: {
          container: '#subModule'
        }
      }
    ], {
    // qiankun 生命周期钩子 - 微应用加载前
    beforeLoad: (app) => {
      // 加载微应用前，加载进度条
      console.log("before load", app.name);
      return Promise.resolve();
    },
    // qiankun 生命周期钩子 - 微应用挂载后
    afterMount: (app) => {
      // 加载微应用前，进度条加载完成
      console.log("after mount", app.name);
      return Promise.resolve();
    },
  })
}

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event) => {
  console.log('addGlobalUncaughtErrorHandler', event)
  const { message: msg } = event;
  // 加载失败时提示
  if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    console.error("微应用加载失败，请检查应用是否可运行");
  }
});