import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from './auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
})

/* ── 请求拦截器：附加 JWT Token ── */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

/* ── 响应拦截器：剥离统一响应体，处理错误 ── */
service.interceptors.response.use(
  (response) => {
    const res = response.data as Result

    // 业务成功 → 直接返回 data
    if (res.code === 200) {
      return res.data
    }

    // 401 未认证 → 清除 token 跳登录
    if (res.code === 401) {
      handleUnauthorized()
      return Promise.reject(new Error(res.message))
    }

    // 其他业务错误
    ElMessage.error(res.message || '请求失败')
    return Promise.reject(new Error(res.message))
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      handleUnauthorized()
    } else {
      ElMessage.error(error.message || '网络异常')
    }
    return Promise.reject(error)
  },
)

function handleUnauthorized() {
  removeToken()
  if (!window.location.pathname.includes('/login')) {
    ElMessage.warning('登录已过期，请重新登录')
    window.location.href = '/login'
  }
}

/** 泛型请求方法，调用处直接拿到 res.data 的类型 */
export function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return service.request(config) as unknown as Promise<T>
}

export default service
