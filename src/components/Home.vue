<template>
  <div class="qiankun-home">
    <h1>欢迎使用 每日优鲜-零售云中台管理系统</h1>
  </div>
</template>

<script>
import store from "@/store"
import { onMounted } from "vue"

export default {
  setup() {
    onMounted(() => {
      setHomeConfig({
        belongTo: "main", // 设置路由地址是否属于主框架, 默认不属于
        showHeader: true, // 显示 ｜ 隐藏顶部导航栏
        showDownload: true, // 显示 ｜ 隐藏顶部右侧下载按钮
        showSidebar: true, // 显示 ｜ 隐藏侧边栏
        showTagsView: true, // 显示 ｜ 隐藏标签列表
        showSubContainer: false
      })
    })
    const setHomeConfig = async (settingData) => {
      await store.dispatch("settings/updateSetting", settingData)
    }

    return {
      setHomeConfig
    }
  }
}
</script>
<style>
.qiankun-home{
  text-align: center;
}
</style>