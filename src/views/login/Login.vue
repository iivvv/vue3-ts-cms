<template>
  <div class="login">
    <login-panel />
    <!-- login.vue content -->
  </div>
</template>

<script setup lang="ts" name="login">
import LoginPanel from './c-cpns/login-panel.vue'
</script>

<style scoped lang="less">
.login {
  background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background: url('../../assets/img/login-bg.svg');
}
</style>
