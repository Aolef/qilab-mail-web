<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getActivityList } from '@/api/modules/activity'

const loading = ref(false)
const tableData = ref<BusActivity[]>([])

type TagType = 'primary' | 'success' | 'warning' | 'info' | 'danger'

const statusMap: Record<number, { text: string; type: TagType }> = {
  0: { text: '禁用', type: 'info' },
  1: { text: '启用', type: 'success' },
}

async function loadData() {
  loading.value = true
  try {
    tableData.value = await getActivityList()
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
        <span class="page-title">活动列表</span>
        <el-button @click="loadData">刷新</el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" border stripe>
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="name" label="活动名称" min-width="150" />
        <el-table-column prop="startTime" label="开始时间" width="170" />
        <el-table-column prop="endTime" label="结束时间" width="170" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status]?.type" size="small">
              {{ statusMap[row.status]?.text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sortOrder" label="排序" width="70" />
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
