<template>
  <div class="index">
    <el-card class="box-card">
      <div class="text item">
        <div class="top">
          <section v-for="(item,index) in sellOrder" :key="index">
            <div class="iconfont" :class="item.icon" :style="{color:item.color}"></div>
            <div>
              <h3>{{item.h3}}</h3>
              <p>{{item.p}}</p>
            </div>
          </section>
        </div>
        <div class="bottomTeb" id="main"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { indexeEharts } from "@/utils/echarts.js";
export default {
  data() {
    return {
      sellOrder: [
        {
          icon: "icon-tuanduicankaoxian-",
          color: "#1296DB",
          h3: "总订单",
          p: 1000
        },
        { icon: "icon-qian", color: "#D4237A", h3: "总销售额", p: 1005450 },
        { icon: "icon-dingdan", color: "#1296DB", h3: "今日订单", p: 200 },
        { icon: "icon-qian4", color: "#1AFA29", h3: "今日销售额", p: 2400 }
      ]
    };
  },
  mounted() {
    indexeEharts("main");
  }
};
</script>

<style lang="less">
.index {
  .el-form {
    width: 350px;
    margin: 20px auto 0;
  }

  .el-card__body {
    max-height: 410px !important;
    background-color: #f0f2f5;
  }
  .top {
    padding: 0 4%;
    display: flex;
    justify-content: space-around;
    & > section {
      width: 20%;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      & > div {
        padding: 12px 0;
        text-align: right;
        h3 {
          color: #999;
          font-size: 18px;
          line-height: 26px;
        }
        p {
          color: #000;
          font-size: 14px;
          font-weight: bold;
          line-height: 20px;
        }
      }
      .iconfont {
        font-size: 45px;
      }
    }
  }
  .bottomTeb {
    margin-top: 20px;
    height: 300px;
    background-color: #fff;
  }
}
</style>