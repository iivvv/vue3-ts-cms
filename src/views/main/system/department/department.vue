<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <!-- <page-content :content-config="contentConfig" /> -->
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    >
      <!-- 具名插槽设置自定义内容 -->
      <template #leader="scope">
        <!-- <span class="leader">++{{ scope.row.leader }}++ </span> -->
        <span class="leader">++{{ scope.row[scope.prop] }}++ </span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue'
import useMainStore from '@/store/main/main'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
// import PageSearch from './c-cpns/page-search.vue'
// import PageContent from './c-cpns/page-content.vue'
// import PageModal from './c-cpns/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'

const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  // const departments = mainStore.entireDepartments.map((item) => {
  //   return { label: item.name, value: item.id }
  // })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      // item.options = mainStore.entireDepartments as any
      item.options.push(...mainStore.entireDepartments)
      // item.options.push(...departments)
    }
  })
  return modalConfig
})

// hooks
// content的逻辑处理
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// modal的逻辑处理
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal()
</script>

<style lang="less" scoped>
.leader {
  color: red;
}
</style>
