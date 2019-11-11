<template>
  <div class="Content">
    <router-view />
  </div>
</template>


<style lang="less" >
.Content {
  margin-right: 5px;
  .el-card {
    .el-card__body {
      padding-right: 15px;
      max-height: 360px;
      overflow-y: scroll;
     /*  &::-webkit-scrollbar {
        display: none;
      } */
    }
  }
}
</style>