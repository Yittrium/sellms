<template>
  <div class="Breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(v,i) in breadArr" :key="i" :to="{ path: v.path }">{{v.tital}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadArr: []
    };
  },
  methods: {
    comBread() {
      this.breadArr = this.$route.meta.breadArr;
    }
  },
  watch: {
    "$route.path"() {
      this.comBread();
    }
  }
};
</script>

<style lang="less">
.Breadcrumb .el-breadcrumb__inner {
  line-height: 50px;
}
</style>