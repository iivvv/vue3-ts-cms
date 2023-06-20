<template>
  <div class="content">
    <!-- 表头 -->
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="usersList" :border="true" style="width: 100%">
        <el-table-column align="center" type="selection" label="选择" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="120"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="140"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="120"
        />
        <el-table-column align="center" prop="enable" label="状态" width="90">
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
              size="small"
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createAt"
          label="创建时间"
          width="200"
        >
          <template #default="scope">
            {{ utcFormat(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="updateAt"
          label="更新时间"
          width="200"
        >
          <template #default="scope">
            {{ utcFormat(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="footer">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { utcFormat } from '@/utils/format'
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(15)
// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 1.发送请求usersList数据，存到store里
const systemStore = useSystemStore()
function fetchUserListData(queryInfo: any = {}) {
  // 1.1.获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  // 1.2.发生网络请求 （由于没有真实的后端接口，这里传参重新请求其实没有变化）
  systemStore.postUsersListAction({ offset, size, ...queryInfo })
}
fetchUserListData()
defineExpose({ fetchUserListData })

// 2.展示数据
//需要给数据包裹响应式，不然直接使用的话会加载不出来，因为请求是异步的，第一次加载是没有结果的。
const { usersList, usersTotalCount } = storeToRefs(systemStore)
// console.log(usersList)

// 3.绑定分页数据
function handleCurrentChange() {
  fetchUserListData()
}

// 5.删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}
function handleNewUserClick() {
  console.log('新建用户')
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;

    .title {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 14px 0;
  }
  // .el-table__cell {
  //   padding: 14px 0;
  // }
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
