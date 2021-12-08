<template>
  <div class="intro-container">
    <div class="title">{{ info.title }}</div>
    <div class="desc">{{ info.desc }}</div>
    <div class="intro-image">
      <img src="https://static-as.missfresh.cn/frontend/cdn-images/Qvcc_2NFh0WqERFg2N0RZYKJ.png" alt="intro-logo"/>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const info = {
      title: '实现门店数智化升级',
      desc: '通过门店商品、会员、营销、订单、售后的在线化管理，实现门店线上业务全面数字化和智能化。'
    }
    return {
      info
    }
  }
}
</script>
<style lang="scss" scoped>
.intro-container {
  z-index: 1;
  padding: 81px 0; // 80px 0;
  width: 520px;
  .title {
    font-size: 30px;
    font-weight: 600;
    color: #222c3d;
    line-height: 42px;
  }

  .desc {
    font-size: 16px;
    font-weight: 500;
    color: #4c5d7c;
    line-height: 32px;
    width: 410px;
    margin-top: 24px;
  }

  .intro-image {
    img {
      width: 366px;
      height: 100px;
      margin-top: 100px;
    }
  }
}
</style>