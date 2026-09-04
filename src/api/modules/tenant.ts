import { request } from '@/utils/request'

/** 租户列表 */
export function getTenantList() {
  return request<BusTenant[]>({ url: '/tenant' })
}

/** 获取租户详情 */
export function getTenantById(id: number) {
  return request<BusTenant>({ url: `/tenant/${id}` })
}

/** 新增租户 */
export function createTenant(data: Partial<BusTenant>) {
  return request<void>({ url: '/tenant', method: 'post', data })
}

/** 更新租户 */
export function updateTenant(data: Partial<BusTenant>) {
  return request<void>({ url: '/tenant', method: 'put', data })
}

/** 删除租户 */
export function deleteTenant(id: number) {
  return request<void>({ url: `/tenant/${id}`, method: 'delete' })
}
