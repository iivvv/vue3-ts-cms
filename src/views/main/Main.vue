<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main">
    <el-container>
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main class="main-container">
          main
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- <h2>main</h2>
    <div>Current Count</div>
    <button @click="handleExitClick">exit</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
// 接受子组件传过来的isFold参数
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
// import { useRouter } from 'vue-router'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

// // 退出登录按钮
// const router = useRouter()
// function handleExitClick() {
//   localCache.removeCache(LOGIN_TOKEN)
//   router.push('/login')
// }
</script>

<style lang="less" scoped>
.main {
  margin: 0;
}
.el-aside {
  background-color: #001529;
  transition: width 0.3s ease;
}
.header {
  background-color: rgb(255, 255, 255);
  height: 40px;
}
.main-container {
  background-color: rgb(207, 236, 236);
  height: 100vh;
}
</style>
