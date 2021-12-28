# vue3-webpack
一个基于 `webpack5` & `vue3` 多窗口模式的模板

❗注意  `vue` or `vue-router` 版本 使用的`yarn`进行管理 可自行换`npm`

## 安装依赖
运行命令
```shell
yarn
```

## 运行调试
运行命令
```shell
yarn run dev:all
```

## 修正问题
- 合并登录项目至主框架
- login登入后阻止回退
- 禁用EventBus处理数据流转
- 完善Vuex的数据处理逻辑
- 增加header部分的用户信息 & 支持顶部导航文件下载
- 更新路由逻辑，增加路由页面的meta信息用于支持公共组件复用
- 增加permission权限控制
- 将代码以typescript形式编写 & 组织
- 增加huksy及commit-lint规范
- 增加样式的全局修改（TOOD）

## 新增与SCRM交互功能

## 新增获客多SDK，具备远程支持能力

获客多管理后台：https://app.hokdo.com/user
对应的token可以从后台获取

新增hokdo对应的sdk依赖包：`npm i @hokdo/core`

在 `permission.ts` 文件中引入了 `hokdo.ts` 文件，文件执行初始化任务。

