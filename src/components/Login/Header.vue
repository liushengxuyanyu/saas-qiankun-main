<template>
  <section class="login-header">
    <div class="header-content">
      <img :src="HeaderLogo" alt="logo" />
    </div>
  </section>
</template>
<script>
import HeaderLogo from '@/assets/images/logo.svg';

export default {
  name: 'LoginHeader',
  setup() {
    return {
      HeaderLogo
    }
  }
}
</script>
<style lang="scss" scoped>
.login-header {
  display: flex;
  justify-content: center;
  .header-content {
    display: flex;
    justify-content: flex-start;
    margin: 40px auto 80px auto;
    min-width: 1040px;
    img {
      height: 36px;
    }
  }
}
</style>