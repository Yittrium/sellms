<template>
  <div class="nav">
    <el-menu
      :default-active="path"
      class="el-menu-vertical-demo"
      background-color="#1EBAB6"
      text-color="#eee"
      active-text-color="#fff"
      unique-opened
      router
    >
      <template v-for="(item,index) in menus">
        <el-menu-item :index="item.path" v-if="!item.children" :key="index">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>

        <el-submenu :index="item.path" v-if="item.children" :key="index">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>

          <el-menu-item v-for="(v,i) in item.children" :key="i" :index="v.path">{{v.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import local from "@/utils/local";

export default {
  data() {
    return { menus: [] };
  },
  methods: {},
  created() {
    let role = local.get("role");
    let asyncMenus = [
      {
        meta: {
          roles: ["super", "general"]
        },
        path: "/home",
        icon: "icon-shouye2",
        title: "后台首页"
      },
      {
        meta: {
          roles: ["super", "general"]
        },
        path: "/home/ordermanage",
        icon: "icon-dingdan1",
        title: "订单管理"
      },
      {
        meta: {
          roles: ["super", "general"]
        },
        path: "3",
        icon: "icon-shangpin2",
        title: "商品管理",
        children: [
          { path: "/home/goodslist", title: "商品列表" },
          { path: "/home/goodsadd", title: "添加商品" }
        ]
      },
      {
        meta: {
          roles: ["super", "general"]
        },
        path: "/home/shopmanage",
        icon: "icon-shop",
        title: "店铺管理"
      },
      {
        meta: {
          roles: ["super"]
        },
        path: "5",
        icon: "icon-zhanghaoguanli",
        title: "账号管理",
        children: [
          { path: "/home/accountlist", title: "账号列表" },
          { path: "/home/accountadd", title: "添加账号" },
          { path: "/home/pwdupdate", title: "修改密码" }
        ]
      },
      {
        meta: {
          roles: ["super"]
        },
        path: "6",
        icon: "icon-tongji",
        title: "销售统计",
        children: [
          { path: "/home/goodstotal", title: "商品统计" },
          { path: "/home/ordertotal", title: "订单统计" }
        ]
      }
    ];
    this.menus = asyncMenus.filter(
      item => item.meta && item.meta.roles.includes(role)
    );
  },
  computed: {
    path() {
      if (this.$route.path === "/home/ordermanage/orderdetail") {
        return "/home/ordermanage";
      }
      if (this.$route.path === "/home/goodslist/goodsedit") {
        return "/home/goodslist";
      }
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" >
.nav {
  i {
    color: #ccc;
    margin-right: 10px;
  }
  .el-submenu__title i {
    color: #ccc;
    margin-right: 10px;
  }

  .el-menu {
    border: none;
  }
  .el-menu-item.is-active {
    font-size: 15px;
    background-color: rgb(36, 65, 121) !important;
    span {
      font-weight: bold;
    }
  }
  .el-menu-item,
  .el-submenu__title {
    padding-left: 40px !important;
    text-align: left;
  }
  .el-submenu ul li.el-menu-item {
    padding-left: 75px !important;
  }
  .el-menu-item:hover,
  .el-submenu__title:hover {
    background-color: rgb(80, 138, 245) !important;
  }
}
</style>