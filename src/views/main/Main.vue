<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main">
    <h2>main</h2>
    <div>Current Count: {{ counter.count }}</div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../../store/counter'
import hyRequest from '../../service'

const counter = useCounterStore()
counter.count++
// 自动补全！ ✨
counter.$patch({ count: counter.count + 22 })
// 或使用 action 代替
counter.increment()

hyRequest
  .get({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<style lang="less" scoped>
.main {
  margin: 0;
}
</style>
