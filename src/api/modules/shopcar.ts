import { request } from '@/utils/request'

/** 购物车列表 */
export function getShopCarList() {
  return request<BusShopCar[]>({ url: '/shopcar' })
}

/** 购物车详情 */
export function getShopCarById(id: number) {
  return request<BusShopCar>({ url: `/shopcar/${id}` })
}

/** 新增购物车 */
export function createShopCar(data: Partial<BusShopCar>) {
  return request<void>({ url: '/shopcar', method: 'post', data })
}

/** 更新购物车 */
export function updateShopCar(data: Partial<BusShopCar>) {
  return request<void>({ url: '/shopcar', method: 'put', data })
}

/** 删除购物车 */
export function deleteShopCar(id: number) {
  return request<void>({ url: `/shopcar/${id}`, method: 'delete' })
}
