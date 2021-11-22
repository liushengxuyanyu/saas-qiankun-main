<template>
  <div class="page-container">
    <section class="page-contents">
      <Header />
      <div class="info">
        <Intro />
        <LoginForm />
      </div>
    </section>
    <!-- 背景图片 -->
    <section class="bg-contents">
      <div class="left-bg-img"></div>
      <div class="right-bg-img"></div>
    </section>
  </div>
</template>
<script>
import Header from "@/components/Login/Header"
import Intro from "@/components/Login/Intro"
import LoginForm from "@/components/Login/LoginForm"

export default {
  name: "Login",
  components: {
    Header,
    Intro,
    LoginForm
  },
  setup() {
    return {}
  }
}
</script>
<style lang="scss">
// @import '../../assets/styles/page' 
.page-container {
  position: relative;
  background-color: #f5f8fa;
  height: 100%;
  overflow-y: hidden;
  .page-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    .info {
      display: flex;
      flex: 1;
      justify-content: center;
    }
  }

  .bg-contents {
    position: relative;
    .left-bg-img {
      position: absolute;
      bottom: -207px;
      left: 0;
      width: 330px;
      height: 400px;
      background-size: 100%;
      background-image: url("//static-as.missfresh.cn/frontend/cdn-images/52emtu1t6EMC84-EtTujy1AO.png");
    }

    .right-bg-img {
      position: absolute;
      top: -735px;
      right: 0;
      width: 410px;
      height: 100vh;
      min-height: 900px;
      background-size: 100%;
      background-repeat: repeat;
      background-image: url("//static-as.missfresh.cn/frontend/cdn-images/LhWfayaOOHsHvGsG1PLb5ZGx.png");
    }
  }
}
</style>