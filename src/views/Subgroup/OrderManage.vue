<template>
  <div class="orderManage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单管理</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px" class="main">
          <div class="flexbox">
            <el-form-item label="订单号">
              <el-input v-model="form.order"></el-input>
            </el-form-item>
            <el-form-item label="收货人">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="form.state" placeholder="请选择订单状态">
                <el-option label="已接单" value="已接单"></el-option>
                <el-option label="待配送" value="待配送"></el-option>
                <el-option label="配送中" value="配送中"></el-option>
                <el-option label="已收货" value="已收货"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flexbox">
            <el-form-item label="下单时间" class="time">
              <el-date-picker
                v-model="form.managetime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round size="small" @click="searchList">查询订单</el-button>
              <el-button round size="small" @click="clearList">清空查询</el-button>
            </el-form-item>
          </div>
        </el-form>
        <!-- 表格 -->
        <el-table :data="orderData" style="width: 100%" max-height="500" border>
          <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="170"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="170"></el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="170"></el-table-column>
          <el-table-column prop="orderAmount" label="金额" width="120"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="primary" round @click.native.prevent="editRow(scope.row)" size="mini">查看/编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>

      </div>
    </el-card>
  </div>
</template>

<script>
import { $orderList } from "@/api/order.js";
import moment from "moment";

export default {
  data() {
    return {
      total: 0,
      pageSize: 5,
      currentPage: 1,
      form: {
        order: "",
        name: "",
        status: "",
        tel: "",
        managetime: ""
      },
      //全部订单
      orderData: []
    };
  },
  methods: {
    //编辑
    editRow(row) {
      window.sessionStorage.setItem("detail", JSON.stringify(row));
      this.$router.push("/home/ordermanage/orderdetail");
    },

    //查询
    searchList() {
      this.currentPage = 1;
      this.getOrderData();
    },
    //清空
    clearList() {
      this.form = {
        order: "",
        name: "",
        status: "",
        tel: "",
        managetime: ""
      };
      this.currentPage = 1;
      this.getOrderData();
    },
    //页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderData();
    },
    //获取表格数据
    async getOrderData() {
      //参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.form.order,
        consignee: this.form.name,
        phone: this.form.tel,
        orderState: this.form.state,
        date: JSON.stringify(this.form.managetime)
      };

      let { total, data } = await $orderList(params);
      this.total = total;
      data.forEach(v => {
        //格式化时间
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss");
      });
      this.orderData = data;
    }
  },
  created() {
    this.getOrderData();
  }
};
</script>

<style lang="less">
.orderManage {
  .el-form.main {
    width: 100%;
    margin: 0 auto 20px;
    .flexbox {
      display: flex;
      justify-content: flex-start;
      .time {
        width: 440px;
      }
    }
    .el-form-item {
      width: 250px;
    }
  }

  .el-card__header > div > span {
    font-size: 18px;
    font-weight: bold;
    cursor: default;
  }
  .el-pagination {
    margin: 15px 0;
  }
  .el-dialog__title {
    font-weight: bold;
  }
  .el-dialog {
    width: 500px;
  }
}
</style>