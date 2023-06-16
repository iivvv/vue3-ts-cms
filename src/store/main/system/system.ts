import { defineStore } from 'pinia'
import { postUsersListData } from '@/service/main/system/system'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    // 请求用户列表数据
    async postUsersListAction() {
      const usersListResult = await postUsersListData()
      const { list, totalCount } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
      // console.log(usersListResult)
    }
  }
})

export default useSystemStore
