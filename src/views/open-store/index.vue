<template>
  <div class="create-store-container">
    <section class="store-card">
      <header>{{ info.title }}</header>
      <div class="card-content">
        <img src="https://static-as.missfresh.cn/frontend/cdn-images/oNNcsQyoYEQ3SL1JOhCBW7L3.png" alt="">
        <div class="card-content__name">{{ info.card.name }}</div>
        <div class="card-content__desc">{{ info.card.desc }}</div>
        <div class="card-content__btn" @click="directToPage">{{ info.card.btnText }}</div>
      </div>
    </section>
  </div>
</template>
<script>
import { reactive } from 'vue'

export default {
  setup() {
    const info = reactive({
      title: '欢迎使用零售云~',
      card: {
        name: '零售云商城',
        desc: '为商家提供建店、交易、订单、履约、结算全链路能力',
        btnText: '立即开店'
      }
    })

    const directToPage = () => {
      // TODO: 有点粗暴，后续改一下
      const OPEN_STORE_URL = `/web-main/wuliu/tms2/tms/base-center/site/create/0/0`
      window.location.href = OPEN_STORE_URL
    }

    return {
      info,
      directToPage
    }
  }
}
</script>
<style lang="scss" scoped>
.create-store-container {
  padding-top: 10%;
  background-color: #F2F3F6;
  height: 100%;
  .store-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    header {
      font-size: 28px;
      font-weight: 500;
      color: #222C3D;
      line-height: 40px;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0px 4px 10px 0px rgba(27, 104, 253, 0.12);
      border-radius: 24px;
      margin-top: 24px;
      width: 359px;
      height: 392px;
      background: #fff;

      img {
        width: 142px;
        height: 95px;
        margin-top: 50px;
      }

      &__name {
        font-size: 20px;
        margin-top: 30px;
        font-weight: 500;
        color: #222C3D;
        line-height: 22px;
      }
      &__desc {
        width: 260px;
        font-size: 16px;
        font-weight: 400;
        color: #4C5D7C;
        line-height: 26px;
        margin-top: 15px;
        text-align: center;
      }
      &__btn {
        margin-top: 32px;
        width: 271px;
        height: 48px;
        background: linear-gradient(315deg, #3130F4 0%, #1378FF 100%);
        box-shadow: 0px 4px 6px 0px rgba(27, 104, 253, 0.3);
        border-radius: 24px;
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>