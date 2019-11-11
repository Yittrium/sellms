<template>
  <div class="pwdupdate">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div class="text item">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
          hide-required-asterisk
          status-icon
        >
          <el-form-item label="旧密码" prop="oldpwd">
            <el-input v-model="form.oldpwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpwd">
            <el-input v-model="form.newpwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmnewpwd">
            <el-input v-model="form.confirmnewpwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认修改</el-button>
            <el-button @click="onCancel">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入验证
import { pwdReg } from "@/utils/reg.js";
import local from "@/utils/local";

//axios
import { $editPassword, $checkOldPwd } from "@/api/account.js";
export default {
  data() {
    const validateOldPwd = async (rule, value, callback) => {
      // 发送请求 验证旧密码是否正确
      let { code, msg } = await $checkOldPwd({ oldPwd: value });

      if (!value) {
        callback(new Error("请输入旧密码"));
      } else if (code === "11") {
        callback(new Error(msg));
      } else {
        callback();
      }
    };

    const validateNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value === this.form.oldpwd) {
        callback(new Error("不能和原密码相同"));
      } else if (!rule.pattern.test(value)) {
        callback(new Error("密码3~8位，必须包括数字和字母！"));
      } else {
        // 如果确认新密码不为空
        if (this.form.confirmnewpwd !== "") {
          this.$refs.form.validateField("confirmnewpwd"); // 再次触发某个“字段”的验证
        }
        callback();
      }
    };
    // 验证确认新密码
    const validateCheckPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请确认新密码"));
      } else if (value !== this.form.newpwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldpwd: "",
        newpwd: "",
        confirmnewpwd: ""
      },
      rules: {
        oldpwd: {// 旧密码验证
          required: true,
          validator: validateOldPwd,
          trigger: "blur"
        }, 
        // 新密码验证
        newpwd: {
          required: true,
          pattern: pwdReg(),
          validator: validateNewPwd,
          trigger: "blur"
        },
        // 验证确认新密码
        confirmnewpwd: {
          required: true,
          validator: validateCheckPass,
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let rst = await $editPassword({
            newPwd: this.form.newpwd
          });

          if (rst.code === 0) {
            local.clear();
            // 跳转到登录页面
            this.bus.$emit("bybus", { rst, hash: "/login",close:false,text:"登录" });
          }
        }
      });
    },
    onCancel() {
      this.form = {
        oldpwd: "",
        newpwd: "",
        confirmnewpwd: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.pwdupdate {
  .el-form {
    width: 350px;
    margin: 20px auto 0;
  }
  .el-card__header span {
    font-size: 18px;
    font-weight: bold;
    cursor: default;
  }
}
</style>