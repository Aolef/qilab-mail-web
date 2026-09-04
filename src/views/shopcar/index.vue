<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getShopCarList } from '@/api/modules/shopcar'

const loading = ref(false)
const tableData = ref<BusShopCar[]>([])

async function loadData() {
  loading.value = true
  try {
    tableData.value = await getShopCarList()
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
        <span class="page-title">购物车列表</span>
        <el-button @click="loadData">刷新</el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" border stripe>
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="memberId" label="用户ID" width="80" />
        <el-table-column prop="productId" label="商品ID" width="80" />
        <el-table-column prop="count" label="数量" width="80" />
        <el-table-column prop="price" label="单价" width="100" />
        <el-table-column prop="createTime" label="加入时间" width="170" />
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
