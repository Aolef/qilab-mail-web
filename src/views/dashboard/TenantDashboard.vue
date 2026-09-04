<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="dashboard">
    <el-card shadow="hover">
      <template #header>概览</template>
      <div class="dashboard-welcome">
        <h2>欢迎回来，{{ userStore.userInfo?.name ?? '商户' }}</h2>
        <p>当前角色：商户</p>
        <p>您可以使用左侧菜单管理商品、订单、活动等业务。</p>
      </div>
    </el-card>

    <el-row :gutter="16" class="dashboard-stats">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">商品总数</div>
            <div class="stat-value">-</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">订单总数</div>
            <div class="stat-value">-</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">活动总数</div>
            <div class="stat-value">-</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">顾客总数</div>
            <div class="stat-value">-</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dashboard-welcome {
  h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  p {
    color: #909399;
    line-height: 1.8;
  }
}

.dashboard-stats {
  .stat-item {
    text-align: center;
    padding: 8px 0;
  }
  .stat-label {
    font-size: 14px;
    color: #909399;
    margin-bottom: 8px;
  }
  .stat-value {
    font-size: 28px;
    font-weight: 600;
    color: #303133;
  }
}
</style>
