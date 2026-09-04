import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { public: true },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '仪表盘', icon: 'Odometer', roles: ['ADMIN', 'TENANT'] },
      },
      {
        path: 'tenant',
        name: 'Tenant',
        component: () => import('@/views/tenant/index.vue'),
        meta: { title: '租户管理', icon: 'OfficeBuilding', roles: ['ADMIN'] },
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/products/index.vue'),
        meta: { title: '商品管理', icon: 'Goods', roles: ['TENANT'] },
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/order/index.vue'),
        meta: { title: '订单管理', icon: 'List', roles: ['TENANT'] },
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('@/views/activity/index.vue'),
        meta: { title: '活动管理', icon: 'Calendar', roles: ['TENANT'] },
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/users/index.vue'),
        meta: { title: '顾客用户', icon: 'User', roles: ['TENANT'] },
      },
      {
        path: 'shopcar',
        name: 'ShopCar',
        component: () => import('@/views/shopcar/index.vue'),
        meta: { title: '购物车', icon: 'ShoppingCart', roles: ['TENANT'] },
      },
    ],
  },
]
