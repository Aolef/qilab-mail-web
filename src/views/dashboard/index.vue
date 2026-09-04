<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import AdminDashboard from './AdminDashboard.vue'
import TenantDashboard from './TenantDashboard.vue'

const userStore = useUserStore()

const current = computed(() =>
  userStore.userType === 'ADMIN' ? AdminDashboard : TenantDashboard,
)
</script>

<template>
  <component :is="current" />
</template>
