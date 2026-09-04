import { request } from '@/utils/request'

/** 账号密码登录 */
export function loginApi(data: LoginRequest) {
  return request<LoginResponse>({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

/** 刷新 Token */
export function refreshTokenApi() {
  return request<{ token: string; expiresIn: number }>({
    url: '/auth/refresh',
    method: 'post',
  })
}

/** 退出登录 */
export function logoutApi() {
  return request<void>({
    url: '/auth/logout',
    method: 'post',
  })
}
