import { request } from '@/utils/request'

/** 顾客用户列表 */
export function getUserList() {
  return request<BusUsers[]>({ url: '/users' })
}

/** 顾客用户详情 */
export function getUserById(id: number) {
  return request<BusUsers>({ url: `/users/${id}` })
}

/** 新增顾客用户 */
export function createUser(data: Partial<BusUsers>) {
  return request<void>({ url: '/users', method: 'post', data })
}

/** 更新顾客用户 */
export function updateUser(data: Partial<BusUsers>) {
  return request<void>({ url: '/users', method: 'put', data })
}

/** 删除顾客用户 */
export function deleteUser(id: number) {
  return request<void>({ url: `/users/${id}`, method: 'delete' })
}
