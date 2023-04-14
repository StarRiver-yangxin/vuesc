import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// Layout组件为整体页面布局文件
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 仪表盘
  {
    path: '/vshop',
    component: Layout,
    redirect: '/vshop/dashboard',
    meta: { title: '' },
    children: [
      // 系统介绍
      {
        path: '/vshop/dashboard',
        name: 'dashboard',
        component: () => import('@/views/vshop/dashboard'),
        // Meta属性用于配置左侧菜单栏的显示方式
        meta: { title: '仪表盘', icon: 'dashboard' }
      }
    ]
  },

  // 用户管理
  {
    path: '/',
    component: Layout,
    redirect: '/vshop/user/user-list',
    meta: { title: '用户管理', icon: 'el-icon-s-custom' },
    // 当只有一个二级页面时  则会省略二级 只显示一级！！！
    alwaysShow: true,
    children: [
      // 系统介绍
      {
        path: '/vshop/user/user-list',
        name: 'user-list',
        component: () => import('@/views/user/user-list'),
        // Meta属性用于配置左侧菜单栏的显示方式
        meta: { title: '用户列表' }
      }
    ]
  },
  // 权限管理
  {
    path: '/store',
    component: Layout,
    redirect: '/vshop/store/role',
    meta: { title: '权限管理', icon: 'el-icon-menu' },
    // 当只有一个二级页面时  则会省略二级 只显示一级！！！
    alwaysShow: true,
    children: [
      // 系统介绍
      {
        path: '/vshop/store/role',
        name: 'user-list',
        component: () => import('@/views/store/role'),
        // Meta属性用于配置左侧菜单栏的显示方式
        meta: { title: '角色列表' }
      },
      {
        path: '/vshop/store/right',
        name: 'user-list',
        component: () => import('@/views/store/right'),
        // Meta属性用于配置左侧菜单栏的显示方式
        meta: { title: '权限列表' }
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    component: Layout,
    redirect: '/vshop/goods/params',
    meta: { title: '商品管理', icon: 'el-icon-s-goods' },
    // 当只有一个二级页面时  则会省略二级 只显示一级！！！
    alwaysShow: true,
    children: [
      // 系统介绍
      {
        path: '/vshop/goods/cate',
        name: 'cate',
        component: () => import('@/views/goods/cate'),
        // Meta属性用于配置左侧菜单栏的显示方式
        meta: { title: '分类管理' }
      },
      {
        path: '/vshop/goods/params',
        name: 'params',
        component: () => import('@/views/goods/params'),
        // Meta属性用于配置左侧菜单栏的显示方式
        meta: { title: '参数管理' }
      },
      {
        path: '/vshop/goods/list',
        name: 'list',
        component: () => import('@/views/goods/list'),
        // Meta属性用于配置左侧菜单栏的显示方式
        meta: { title: '商品列表' }
      }
    ]
  },
  // 订单管理
  {
    path: '/orders',
    component: Layout,
    redirect: '/vshop/orders/list',
    meta: { title: '订单管理', icon: 'el-icon-s-order' },
    // 当只有一个二级页面时  则会省略二级 只显示一级！！！
    alwaysShow: true,
    children: [
      // 系统介绍
      {
        path: '/vshop/orders/list',
        name: 'list',
        component: () => import('@/views/orders/list'),
        // Meta属性用于配置左侧菜单栏的显示方式
        meta: { title: '订单列表' }
      }
    ]
  },
  // 数据统计
  {
    path: '/reports',
    component: Layout,
    redirect: '/vshop/reports/list',
    meta: { title: '数据统计', icon: 'el-icon-s-data' },
    // 当只有一个二级页面时  则会省略二级 只显示一级！！！
    alwaysShow: true,
    children: [
      // 系统介绍
      {
        path: '/vshop/reports/list',
        name: 'list',
        component: () => import('@/views/reports/list'),
        // Meta属性用于配置左侧菜单栏的显示方式
        meta: { title: '数据报表' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
