<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" />
      <h2 class="title" v-show="!isFold">Vue3+ts管理系统</h2>
    </div>
    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :default-active="defaultValue"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { localCache } from '../../utils/cache'
import { ref } from 'vue'
import { computed } from 'vue'
import { mapPathToMenu } from '../../utils/map-menu'

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态的菜单
const userMenus = localCache.getCache('userMenus')

// 2.监听item的点击
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}
//3.根据地址显示高亮菜单
const route = useRoute()
// const currentMenu = mapPathToMenu(userMenus, route.path)
// const defaultValue = ref<string>(currentMenu.id + '')
const defaultValue = computed(() => {
  const currentMenu = mapPathToMenu(userMenus, route.path)
  return currentMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  margin: 0;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .img {
    height: 100%;
    margin: 0 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  background-color: #e07c7c;
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
