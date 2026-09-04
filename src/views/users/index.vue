<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserList } from '@/api/modules/users'

const loading = ref(false)
const tableData = ref<BusUsers[]>([])

async function loadData() {
  loading.value = true
  try {
    tableData.value = await getUserList()
  } catch {
    // 错误已由拦截器处理
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="page-container">
    <el-card shadow="never">
      <div class="page-toolbar">
        <span class="page-title">顾客用户列表</span>
        <el-button @click="loadData">刷新</el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" border stripe>
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="name" label="姓名" min-width="100" />
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="openId" label="微信OpenID" min-width="200" show-overflow-tooltip />
        <el-table-column prop="createTime" label="注册时间" width="170" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  .page-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .page-title {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
