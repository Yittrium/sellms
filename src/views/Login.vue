<template>
  <div class="login">
    <Header :isshow="isshow" />

    <main>
      <div class="title">
        <div class="hr"></div>
        <span>系统登录</span>
      </div>
      <div class="formbox">
        <el-form
          :model="loginForm"
          status-icon
          ref="loginForm"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item prop="acc">
            <el-input
              type="text"
              prefix-icon="iconfont icon-yonghu"
              v-model="loginForm.acc"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              @click.native="changeType"
              :suffix-icon="isOpen ? 'iconfont icon-yanjing' : 'iconfont icon-yanjing-bi'"
              prefix-icon="iconfont icon-suo"
              :type="isOpen? 'text': 'password'"
              v-model="loginForm.pwd"
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <el-button @click="resetForm()">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>

<script>
import local from "@/utils/local";

// 引入验证
import { checkpwd, checkacc } from "@/utils/reg.js";
//头部
import Header from "../components/Header.vue";

//axios
import { $login } from "@/api/account.js";

export default {
  components: {
    Header
  },

  data() {
    return {
      loginForm: {
        acc: "",
        pwd: ""
      },
      isOpen: false,
      isshow: false,
      // 模态框数据

      rules: {
        acc: checkacc,
        pwd: checkpwd
      }
    };
  },

  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          //前端验证通过
          let { code, msg, err, id, token, role } = await $login(
            this.loginForm
          );
          let hash = "",
            text = "确定",
            close = true;
          if (code === 1) {
            local.set("token", token);
            local.set("role", role);
            hash = "home";
            close = false;
            text = "后台首页";
          }
          this.bus.$emit("bybus", { rst: { msg, err }, hash, close, text });
        }
      });
    },
    resetForm() {
      this.loginForm.acc = "";
      this.loginForm.pwd = "";
    },
    changeType(e) {
      if (e.target.className.includes("icon-yanjing")) {
        this.isOpen = !this.isOpen;
      }
    }
  }
};
</script>

<style lang="less" >
.login {
  width: 100%;
  height: 100%;

  .formbox {
    width: 320px;
    margin: 0 auto;
    form {
      margin-left: 50px;
      .el-input__inner {
        border: 1px solid #409eff;
      }
      .el-input__prefix,
      .el-input__suffix {
        color: #409eff;
      }
      .el-button {
        border: 1px solid #409eff;
        padding: 12px 30px;
      }
      .el-button + .el-button {
        margin-left: 36px;
      }
      .el-form-item {
        margin-bottom: 36px;
      }
      .el-form-item.is-error .el-input__inner,
      .el-form-item.is-error .el-input__inner:focus {
        border-color: #409eff;
      }
    }
  }
  main {
    width: 800px;
    margin: 0 auto;
  }
  .title {
    line-height: 100px;
    position: relative;
    margin: 60px auto 80px;
    cursor: default;
    .hr {
      height: 50px;
      border-bottom: 2px solid #409eff;
    }
    span {
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -56px;
      font-size: 28px;
      font-weight: bold;
      padding: 0 20px;
      background-color: #fff;
      color: #409eff;
    }
  }
}
</style>