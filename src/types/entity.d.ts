interface BaseEntity {
  createTime: string
  updateTime: string
}

/** 平台管理员 sys_admin */
interface SysAdmin extends BaseEntity {
  id: number
  username: string
  password?: string
  name: string
  status: 0 | 1
  deleted?: 0 | 1
}

/** 租户 bus_tenant */
interface BusTenant extends BaseEntity {
  tenantId: number
  tenantName: string
  contactName: string
  contactPhone: string
  contactAddress: string
  status: 0 | 1 | 2 | 3
  memberType: string
  trialStartTime: string | null
  trialEndTime: string | null
  subscribeStartTime: string | null
  subscribeEndTime: string | null
  loginName: string
  loginPassword?: string
  deleted?: 0 | 1
}

/** 顾客用户 bus_users */
interface BusUsers extends BaseEntity {
  id: number
  tenantId: number
  username: string
  password?: string
  name: string
  phone: string
  openId: string
  avatorUrl: string
}

/** 商品 bus_products */
interface BusProducts extends BaseEntity {
  id: number
  tenantId: number
  name: string
  description: string
  originalPrice: number
  stock: number
  soldCount: number
  isPromotion: 0 | 1
  mainImage: string
  status: 0 | 1
}

/** 商品分类 bus_product_type */
interface BusProductType extends BaseEntity {
  id: number
  tenantId: number
  name: string
  isTopShow: 0 | 1
  isSearchShow: 0 | 1
  sortOrder: number
}

/** 订单 bus_order */
interface BusOrder extends BaseEntity {
  id: number
  tenantId: number
  memberId: number
  orderNo: string
  totalPrice: number
  actualPrice: number
  status: 0 | 1 | 2 | 3
}

/** 活动 bus_activity */
interface BusActivity extends BaseEntity {
  id: number
  tenantId: number
  name: string
  imageUrl: string
  startTime: string
  endTime: string
  status: 0 | 1
  sortOrder: number
}

/** 购物车 bus_shop_car */
interface BusShopCar extends BaseEntity {
  id: number
  tenantId: number
  memberId: number
  productId: number
  count: number
  price: number
}
