<template>
  <div class="header">
    <div class="container-fulit">
      <img src="/images/logo.jpg" alt="窜天猴外卖" />
      <h1>
        <span>窜天猴外卖管理系统</span>
      </h1>
      <div v-show="isshow" class="personal">
        <span>欢迎您的加盟，{{account}}</span>
        <div class="toux">
          <el-dropdown placement="bottom" @command="command">
            <span class="el-dropdown-link">
              <img v-if="imgUrl" :src="imgAPI + imgUrl" alt="头像" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="loginout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import local from "@/utils/local";
import { $personal } from "@/api/account.js";

export default {
  props: {
    isshow: {
      type: Boolean, // 规定参数类型
      default: false // 默认参数
    }
  },
  data() {
    return {
      account: "",
      imgUrl: "",
      imgAPI: "http://172.16.11.201:5000/upload/account/"
    };
  },
  created() {
    if (this.isshow) {
      this.getinfo();
    }

    this.bus.$on("update", () => {
      this.getinfo();
    });

  },
  methods: {
    async getinfo() {
      let {personalInfo} = await $personal();

      this.account = personalInfo.acc;
      this.imgUrl = personalInfo.imgUrl;
    },
    command(command) {
      if (command === "loginout") {
        setTimeout(() => {
          local.clear();
          this.$router.push({ path: "/login" });
        }, 1000);
      } else if (command === "personal") {
        this.$router.push({ path: "/home/personal" });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  flex: 0 0 60px;
  .container-fulit {
    width: 100%;
    background-color: #1ebab6;
    cursor: default;
    margin: 0 auto;
    text-align: left;
    display: flex;
    line-height: 60px;
    & > img {
      flex: 0 0 80px;
      height: 60px;
      margin: 0 40px 0 80px;
    }
    h1 {
      color: white;
      font-weight: bold;
      font-size: 30px;
      flex: 1;
      span {
        font-size: 40px;
        font-family: "my";
      }
    }
    .personal {
      flex: 0 0 300px;
      margin-right: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .toux {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        .el-dropdown,
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          outline: none;
        }
      }
      span {
        color: #eee;
        font-weight: bold;
        margin-right: 25px;
      }
    }
  }
}
</style>