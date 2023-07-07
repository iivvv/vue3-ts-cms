import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type callbackType = (data?: any) => void

function usePageModal(newCallback?: callbackType, editCallback?: callbackType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewDataClick() {
    if (newCallback) newCallback() //
    modalRef.value?.setDialogVisible()
  }
  function handleEditDataClick(data: any) {
    if (editCallback) editCallback(data) //
    modalRef.value?.setDialogVisible(false, data)
    console.log(data)
  }

  return {
    modalRef,
    handleNewDataClick,
    handleEditDataClick
  }
}

export default usePageModal
