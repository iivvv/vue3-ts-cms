<template>
  <div class="content">
    <!-- 表头 -->
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewData">新建用户</el-button>
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
          <el-button type="primary" size="small" icon="Edit" text>
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="Delete" text>
            删除
          </el-button>
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

function handleNewData() {
  console.log('新建用户')
}

// 1.发送action 请求usersList数据
const systemStore = useSystemStore()
// systemStore.postUsersListAction() //异步操作第一次没有返回值
function fetchUserListData(queryInfo: any = {}) {
  // 1.1.获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  // 1.2.发生网络请求 （由于没有真实的后端接口，这里传参重新请求其实没有变化）
  systemStore.postUsersListAction({ offset, size, ...queryInfo })
}
fetchUserListData()

// 2.展示数据
const { usersList, usersTotalCount } = storeToRefs(systemStore)
// console.log(usersList)

// 3.绑定分页数据
function handleCurrentChange() {
  fetchUserListData()
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
