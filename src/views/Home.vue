<template>
  <div class="home">
    <el-container>
      <el-header>
        <Header :isshow="isshow"></Header>
      </el-header>
      <el-container>
        <el-aside>
          <Nav />
        </el-aside>
        <el-container>
          <el-main>
            <Breadcrumb />
            <Content />
          </el-main>
          <el-footer height="40px">
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入组件
import Header from "../components/Header";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Content from "../components/Content";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  components: {
    Header,
    Footer,
    Content,
    Nav,
    Breadcrumb
  },
  data() {
    return {
      isshow: true
    };
  }
};
</script>



<style lang="less">
.home {
  height: 100%;
  & > .el-container {
    height: 100%;
    display: flex;
    .el-header {
      padding: 0;
      margin-bottom: 6px;
    }
    .el-aside {
      background-color: #1ebab6;
      margin-right: 10px;
      min-width: 64px;
      max-width: 200px;
    }
    .el-main {
      background-color: #fff;
      padding: 0;
    }
    .el-footer {
      padding: 0;
      margin-top: 6px;
    }
  }
  
  
}
</style>