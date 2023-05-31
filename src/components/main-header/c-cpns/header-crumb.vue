<template>
  <div class="crumb">
    <!-- <el-breadcrumb separator-icon="CaretRight"> -->
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '../../../store/login/login'
import { mapPathToBreadcrumbs } from '../../../utils/map-menu'

const breadcrumbs = computed(() => {
  const route = useRoute()
  const userMenus = useLoginStore().userMenus
  return mapPathToBreadcrumbs(userMenus, route.path)
})
</script>

<style lang="less" scoped>
.crumb {
  color: red;
}
</style>
