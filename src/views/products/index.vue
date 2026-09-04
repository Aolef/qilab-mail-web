<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getProductList,
  deleteProduct,
} from '@/api/modules/product'

const loading = ref(false)
const tableData = ref<BusProducts[]>([])

type TagType = 'primary' | 'success' | 'warning' | 'info' | 'danger'

const statusMap: Record<number, { text: string; type: TagType }> = {
  0: { text: '已下架', type: 'info' },
  1: { text: '已上架', type: 'success' },
}

async function loadData() {
  loading.value = true
  try {
    tableData.value = await getProductList()
  } catch {
    // 错误已由拦截器处理
  } finally {
    loading.value = false
  }
}

async function handleDelete(row: BusProducts) {
  await ElMessageBox.confirm('确认删除该商品？', '提示', { type: 'warning' })
  try {
    await deleteProduct(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch {
    // 错误已由拦截器处理
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
        <el-button type="primary" :icon="Plus">新增商品</el-button>
        <el-button @click="loadData">刷新</el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" border stripe>
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="name" label="商品名称" min-width="150" />
        <el-table-column prop="originalPrice" label="原价" width="100" />
        <el-table-column prop="stock" label="库存" width="80" />
        <el-table-column prop="soldCount" label="已售" width="80" />
        <el-table-column label="促销" width="70">
          <template #default="{ row }">
            <el-tag :type="row.isPromotion === 1 ? 'danger' : 'info'" size="small">
              {{ row.isPromotion === 1 ? '促销中' : '无' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status]?.type" size="small">
              {{ statusMap[row.status]?.text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button size="small" :icon="Edit" link>编辑</el-button>
            <el-button size="small" :icon="Delete" link type="danger" @click="handleDelete(row as BusProducts)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  .page-toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
}
</style>
