import { request } from '@/utils/request'

/** 商品列表 */
export function getProductList() {
  return request<BusProducts[]>({ url: '/products' })
}

/** 商品详情 */
export function getProductById(id: number) {
  return request<BusProducts>({ url: `/products/${id}` })
}

/** 新增商品 */
export function createProduct(data: Partial<BusProducts>) {
  return request<void>({ url: '/products', method: 'post', data })
}

/** 更新商品 */
export function updateProduct(data: Partial<BusProducts>) {
  return request<void>({ url: '/products', method: 'put', data })
}

/** 删除商品 */
export function deleteProduct(id: number) {
  return request<void>({ url: `/products/${id}`, method: 'delete' })
}
