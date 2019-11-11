import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home", tital: "后台首页" }
          ]
        },
        path: '',
        component: () => import('../views/Subgroup/Index.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/ordermanage", tital: "订单管理" }
          ]
        },
        path: '/home/ordermanage',
        component: () => import('../views/Subgroup/OrderManage.vue'),

      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/ordermanage", tital: "订单管理" },
            { path: "/home/ordermanage/orderdetail", tital: "编辑订单" }
          ]
        },
        path: '/home/ordermanage/orderdetail',
        component: () => import('../views/Subgroup/OrderDetail.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/goodslist", tital: "商品管理" },
            { path: "/home/goodslist", tital: "商品列表" }
          ]
        },
        path: '/home/goodslist',
        component: () => import('../views/Subgroup/GoodsManage/GoodsList.vue'),

      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/goodslist", tital: "商品管理" },
            { path: "/home/goodslist", tital: "商品列表" },
            { path: "/home/goodslist/goodsedit", tital: "编辑商品" }
          ]
        },
        path: '/home/goodslist/goodsedit',
        component: () => import('../views/Subgroup/GoodsManage/GoodsEdit.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/goodslist", tital: "商品管理" },
            { path: "/home/goodsadd", tital: "添加商品" }
          ]
        },
        path: '/home/goodsadd',
        component: () => import('../views/Subgroup/GoodsManage/GoodsAdd.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/shopmanage", tital: "店铺管理" }
          ]
        },
        path: '/home/shopmanage',
        component: () => import('../views/Subgroup/ShopManage.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/accountList", tital: "账号管理" },
            { path: "/home/accountList", tital: "账号列表" }
          ]
        },
        path: '/home/accountList',
        component: () => import('../views/Subgroup/AccountManage/AccountList.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/accountList", tital: "账号管理" },
            { path: "/home/accountadd", tital: "添加账号" }
          ]
        },
        path: '/home/accountadd',
        component: () => import('../views/Subgroup/AccountManage/AccountAdd.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/accountList", tital: "账号管理" },
            { path: "/home/pwdupdate", tital: "修改密码" }
          ]
        },
        path: '/home/pwdupdate',
        component: () => import('../views/Subgroup/AccountManage/PwdUpdate.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/goodstotal", tital: "销售统计" },
            { path: "/home/goodstotal", tital: "商品统计" }
          ]
        },
        path: '/home/goodstotal',
        component: () => import('../views/Subgroup/SalesTotal/GoodsTotal.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/goodstotal", tital: "销售统计" },

            { path: "/ordertotal", tital: "订单统计" }
          ]
        },
        path: '/home/ordertotal',
        component: () => import('../views/Subgroup/SalesTotal/OrderTotal.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: "/home", tital: "首页" },
            { path: "/home/personal", tital: "个人中心" }
          ]
        },
        path: '/home/personal',
        component: () => import('../views/Subgroup/Personal.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
