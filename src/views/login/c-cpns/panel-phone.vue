<template>
  <div class="phone">
    <el-form :model="phone" label-width="70px" :rules="phoneRules">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="phone.phoneNum" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="verify-code">
          <el-input v-model="phone.code" />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="phone">
import { reactive } from 'vue'
import type { FormRules } from 'element-plus'
// 定义内部的数据
const phone = reactive({
  phoneNum: '',
  code: ''
})
// 定义form的验证规则
const phoneRules: FormRules = {
  phoneNum: [
    { required: true, message: '必须输入手机号~', trigger: 'blur' },
    {
      pattern: /^[0-9]{11}$/,
      message: '必须是11位数字',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '必须输入验证码~', trigger: 'blur' },
    { pattern: /^[0-9]{6}$/, message: '验证码为6位数字', trigger: 'blur' }
  ]
}
</script>

<style scoped lang="less">
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
