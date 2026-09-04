<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { routes } from '@/router/routes'

const route = useRoute()
const userStore = useUserStore()
const appStore = useAppStore()

const menuRoutes = computed(() => {
  const layoutRoute = routes.find((r) => r.path === '/')
  if (!layoutRoute?.children) return []
  return layoutRoute.children.filter((child) => {
    if (!child.meta?.roles) return true
    return child.meta.roles.includes(userStore.userType ?? '')
  })
})

const activeMenu = computed(() => {
  const seg = route.path.split('/')[1] ?? ''
  return '/' + seg
})
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      <span v-if="!appStore.sidebarCollapsed">Qilab Mail</span>
      <span v-else>Q</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="appStore.sidebarCollapsed"
      :collapse-transition="false"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
    >
      <el-menu-item
        v-for="item in menuRoutes"
        :key="item.path"
        :index="'/' + item.path"
      >
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <template #title>{{ item.meta?.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  background-color: #2b3a4d;
  flex-shrink: 0;
}

.el-menu {
  border-right: none;
  flex: 1;
}
</style>
