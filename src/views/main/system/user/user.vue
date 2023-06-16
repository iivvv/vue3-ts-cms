<template>
  <div class="user">
    <user-search></user-search>
    <user-content></user-content>
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
</script>

<style scoped>
.user {
  border-radius: 8px;
  /* background-color: aqua; */
  overflow: hidden;
}
</style>
