<template>
  <div id="app">
    <router-view />
    <!-- 模态框 -->
    <Modalbox />
  </div>
</template>
<script>

//模态框
import Modalbox from "@/components/Modalbox";

export default {
  components: {
    Modalbox
  }
}
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  -overflow: hidden;
}
@font-face {
  font-family: "my"; //为字体取名字
  src: url("/myrb.ttf") format("truetype"); //字体文件
}
</style>
