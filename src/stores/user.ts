import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi, logoutApi } from '@/api/modules/auth'
import {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
} from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || '')
  const userInfo = ref<LoginResponse | null>(getUserInfo())

  const userType = computed(() => userInfo.value?.userType ?? null)
  const isLoggedIn = computed(() => !!token.value)

  async function login(params: LoginRequest) {
    const res = await loginApi(params)
    token.value = res.token
    userInfo.value = res
    setToken(res.token)
    setUserInfo(res)
    return res
  }

  async function logout() {
    try {
      await logoutApi()
    } finally {
      resetState()
    }
  }

  function resetState() {
    token.value = ''
    userInfo.value = null
    removeToken()
    removeUserInfo()
  }

  return { token, userInfo, userType, isLoggedIn, login, logout, resetState }
})
