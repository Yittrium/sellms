<template>
  <div class="accadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <div class="text item">
        <el-form
          ref="accAddForm"
          :model="form"
          label-width="80px"
          status-icon
          :rules="rules"
          hide-required-asterisk
        >
          <el-form-item label="账号" prop="acc">
            <el-input v-model="form.acc"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="form.pwd" type="password"></el-input>
          </el-form-item>

          <el-form-item label="职位" prop="power">
            <el-select v-model="form.power" placeholder="请选择此账号的职位">
              <el-option label="员工" value="员工"></el-option>
              <el-option label="老板" value="老板"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认添加</el-button>
            <el-button @click="onCancel">重置表单</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入验证
import { checkpwd, checkacc } from "@/utils/reg.js";

//请求
import { $addAccound } from "@/api/account.js";

export default {
  data() {
    return {
      form: {
        acc: "",
        pwd: "",
        power: ""
      },
      rules: {
        acc: checkacc,
        pwd: checkpwd,
        power: [
          { required: true, message: "请为此账号分配职位！", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.accAddForm.validate(async valid => {
        if (valid) {
          let rst = await $addAccound(this.form);

          this.bus.$emit("bybus", {
            rst,
            hash: "/home/accountlist",
            text: "账号列表"
          });
        }
      });
    },
    onCancel() {
      this.$refs.accAddForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.accadd {
  .el-form {
    width: 350px;
    margin: 20px auto 0;
  }
  .el-card__header span {
    font-size: 18px;
    font-weight: bold;
    cursor: default;
  }
  .el-select {
    width: 100%;
  }
}
</style>