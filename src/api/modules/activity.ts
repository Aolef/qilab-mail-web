import { request } from '@/utils/request'

/** 活动列表 */
export function getActivityList() {
  return request<BusActivity[]>({ url: '/activity' })
}

/** 活动详情 */
export function getActivityById(id: number) {
  return request<BusActivity>({ url: `/activity/${id}` })
}

/** 新增活动 */
export function createActivity(data: Partial<BusActivity>) {
  return request<void>({ url: '/activity', method: 'post', data })
}

/** 更新活动 */
export function updateActivity(data: Partial<BusActivity>) {
  return request<void>({ url: '/activity', method: 'put', data })
}

/** 删除活动 */
export function deleteActivity(id: number) {
  return request<void>({ url: `/activity/${id}`, method: 'delete' })
}
