<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main">
    <el-container>
      <!-- 左侧栏 -->
      <el-aside :width="isFold ? '60px' : '180px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <!-- 右侧区域 -->
      <el-container>
        <!-- 右侧顶部 -->
        <el-header class="header">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <!-- 右侧子页面区域 -->
        <el-main class="main-container">
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
  background-color: rgb(235, 235, 235);
  height: 100vh;
}
// .el-main{
//   border-radius: 20px;
// }
</style>
