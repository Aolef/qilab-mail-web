import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'

NProgress.configure({ showSpinner: false })

const WHITE_LIST = ['/login']

export function setupRouterGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    NProgress.start()

    // 公开路由放行
    if (to.meta.public || WHITE_LIST.includes(to.path)) {
      // 已登录用户访问登录页 → 跳首页
      if (to.path === '/login') {
        const userStore = useUserStore()
        if (userStore.token) {
          next('/dashboard')
          return
        }
      }
      next()
      return
    }

    const userStore = useUserStore()

    // 无 token → 跳登录
    if (!userStore.token) {
      next({ path: '/login', query: { redirect: to.fullPath } })
      return
    }

    // 角色权限校验
    if (to.meta.roles && !to.meta.roles.includes(userStore.userType ?? '')) {
      next('/dashboard')
      return
    }

    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
