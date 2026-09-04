import { request } from '@/utils/request'

/** 订单列表 */
export function getOrderList() {
  return request<BusOrder[]>({ url: '/order' })
}

/** 订单详情 */
export function getOrderById(id: number) {
  return request<BusOrder>({ url: `/order/${id}` })
}

/** 新增订单 */
export function createOrder(data: Partial<BusOrder>) {
  return request<void>({ url: '/order', method: 'post', data })
}

/** 更新订单 */
export function updateOrder(data: Partial<BusOrder>) {
  return request<void>({ url: '/order', method: 'put', data })
}

/** 删除订单 */
export function deleteOrder(id: number) {
  return request<void>({ url: `/order/${id}`, method: 'delete' })
}
