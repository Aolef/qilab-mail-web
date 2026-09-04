<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { Expand, Fold, ArrowDown, SwitchButton } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

async function handleLogout() {
  await userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="navbar">
    <el-icon class="navbar-toggle" @click="appStore.toggleSidebar()">
      <Fold v-if="!appStore.sidebarCollapsed" />
      <Expand v-else />
    </el-icon>

    <div class="navbar-right">
      <el-dropdown trigger="click">
        <span class="navbar-user">
          {{ userStore.userInfo?.name ?? '用户' }}
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="SwitchButton" @click="handleLogout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-toggle {
  font-size: 20px;
  cursor: pointer;
  color: #5a5e66;
}

.navbar-toggle:hover {
  color: #409eff;
}

.navbar-user {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #5a5e66;
  font-size: 14px;
}

.navbar-user:hover {
  color: #409eff;
}
</style>
