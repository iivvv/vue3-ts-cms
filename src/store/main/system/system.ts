import { defineStore } from 'pinia'
import {
  postUsersListData,
  deleteUserById,
  newUserData,
  editUserData
} from '@/service/main/system/system'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    // 请求用户列表数据
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { list, totalCount } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
      // console.log(usersListResult)
    },
    // 删除用户信息
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteResult = await deleteUserById(id)
      console.log('已删除（虚拟）')
      // console.log(deleteResult)
      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    //新建用户
    async newUserDataAction(userInfo: any) {
      // 1.创建用户数据
      const res = await newUserData(userInfo)
      console.log(res)

      // 2.请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    //编辑用户
    async editUserDataAction(id: number, userInfo: any) {
      const res = await editUserData(id, userInfo)
      console.log(res)
      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
