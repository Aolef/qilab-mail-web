/** 后端统一响应体 */
interface Result<T = any> {
  code: number
  message: string
  data: T
}

/** 分页参数（后端暂未实现，预留） */
interface PageParam {
  page?: number
  size?: number
}
