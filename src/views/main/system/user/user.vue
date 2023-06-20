<template>
  <!-- <div>user.vue</div> -->
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />

    <user-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />

    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
// import { ref } from 'vue'
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
// import UserSearch from './c-cpns/user-search.vue'
// import UserContent from './c-cpns/user-content.vue'
// import UserModal from './c-cpns/user-modal.vue'

// // 对content组件的操作
// const contentRef = ref<InstanceType<typeof UserContent>>()
// //查询
// function handleQueryClick(formData: any) {
//   contentRef.value?.fetchUserListData(formData)
//   console.log('虚拟查询')
// }
// //重置
// function handleResetClick() {
//   contentRef.value?.fetchUserListData()
//   console.log('成功重置')
// }

// // 对modal组件的操作
// const modalRef = ref<InstanceType<typeof UserModal>>()
// //新建
// function handleNewClick() {
//   // modalRef.value?.setModalVisible()
// }
// //编辑
// function handleEditClick(itemData: any) {
//   console.log(itemData)
//   // modalRef.value?.setModalVisible(false, itemData)
// }
</script>

<style scoped>
.user {
  border-radius: 8px;
  /* background-color: aqua; */
  overflow: hidden;
}
</style>
