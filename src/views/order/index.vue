<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getOrderList } from '@/api/modules/order'

const loading = ref(false)
const tableData = ref<BusOrder[]>([])

const statusMap: Record<number, string> = {
  0: '待接单',
  1: '商家准备中',
  2: '待取货',
  3: '已结束',
}

async function loadData() {
  loading.value = true
  try {
    tableData.value = await getOrderList()
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
        <span class="page-title">订单列表</span>
        <el-button @click="loadData">刷新</el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" border stripe>
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="orderNo" label="订单号" min-width="180" />
        <el-table-column prop="totalPrice" label="总价" width="100" />
        <el-table-column prop="actualPrice" label="实付" width="100" />
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <el-tag size="small">{{ statusMap[row.status] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170" />
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
