<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品统计</span>
      </div>
      <div class="text item" id="main"></div>
    </el-card>
  </div>
</template>

<script>
import { goodsTotaleEharts } from "@/utils/echarts.js";

export default {
  data() {
    return {};
  },
  mounted() {
    goodsTotaleEharts("main");
  }
};
</script>

<style lang="less" scoped>
.el-form {
  width: 350px;
  margin: 20px auto 0;
}
.el-card__header span {
  font-size: 18px;
  font-weight: bold;
  cursor: default;
}
#main{
  height: 360px;
}
</style>