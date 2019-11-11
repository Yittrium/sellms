<template>
  <div class="detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="tital">订单管理</span>

        <el-button class="returnlist" size="small" @click="returnList">返回列表</el-button>
        <el-button
          class="ordereditbtn"
          :type="isEdit ? 'success' : 'primary'"
          size="small"
          @click="orderedit"
        >{{btnText}}</el-button>
      </div>
      <div class="text item">
        <el-form
          :model="editOrder"
          label-width="80px"
          :rules="rules"
          ref="editOrder"
          hide-required-asterisk
        >
          <el-form-item label="订单号" prop="orderNo">
            <span v-if="!isEdit">{{editOrder.orderNo}}</span>
            <el-input v-else v-model="editOrder.orderNo" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <span v-if="!isEdit">{{editOrder.orderTime}}</span>
            <el-date-picker v-else v-model="editOrder.orderTime" type="datetime" placeholder="下单时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <span v-if="!isEdit">{{editOrder.phone}}</span>
            <el-input v-else v-model="editOrder.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人" prop="consignee">
            <span v-if="!isEdit">{{editOrder.consignee}}</span>
            <el-input v-else v-model="editOrder.consignee" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="deliverAddress">
            <span v-if="!isEdit">{{editOrder.deliverAddress}}</span>
            <el-input v-else v-model="editOrder.deliverAddress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="送达时间">
            <span v-if="!isEdit">{{editOrder.deliveryTime}}</span>
            <el-date-picker
              v-else
              v-model="editOrder.deliveryTime"
              type="datetime"
              placeholder="送达时间"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="用户备注">
            <span v-if="!isEdit">{{editOrder.remarks}}</span>
            <el-input v-else v-model="editOrder.remarks" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" prop="orderAmount">
            <span v-if="!isEdit">{{editOrder.orderAmount}}</span>
            <el-input v-else v-model="editOrder.orderAmount" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <span v-if="!isEdit">{{editOrder.orderState}}</span>
            <el-select v-else v-model="editOrder.orderState" placeholder="请选择订单状态">
              <el-option label="已接单" value="已接单"></el-option>
              <el-option label="待配送" value="待配送"></el-option>
              <el-option label="配送中" value="配送中"></el-option>
              <el-option label="已收货" value="已收货"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { $orderEdit } from "@/api/order.js";
import moment from "moment";
import { checktel, checkNum, checkamount } from "@/utils/reg.js";
export default {
  data() {
    return {
      //编辑订单
      isEdit: false,
      editOrder: {},
      //验证
      rules: {
        phone: checktel,
        consignee: {
          required: true,
          message: "收货人不能为空！",
          trigger: "blur"
        },
        deliverAddress: {
          required: true,
          message: "收货地址不能为空！",
          trigger: "blur"
        },
        orderNo: checkNum,
        orderAmount: checkamount
      }
    };
  },
  computed: {
    btnText() {
      return this.isEdit ? "保存订单" : "编辑订单";
    }
  },
  methods: {
    returnList() {
      this.$router.push("/home/ordermanage");
    },
    orderedit() {
      if (this.isEdit) {
        //表单验证通过
        this.$refs.editOrder.validate(async valid => {
          if (valid) {
            //保存
            let rst = await $orderEdit(this.editOrder);
            //弹提示
            this.bus.$emit("bybus", { rst, hash: "/home/ordermanage",text:"订单管理" });
          } else {
            this.bus.$emit("bybus", {
              rst: { msg: "保存失败", err: "输入信息存在错误！" },
              close: false
            });
          }
        });
      } else {
        this.isEdit = !this.isEdit;
      }
    }
  },
  created() {
    let detail = JSON.parse(window.sessionStorage.getItem("detail"));
    this.editOrder = detail;
  }
};
</script>

<style lang="less" scoped>
.detail {
  .el-form {
    width: 300px;
    margin: 0 auto;
  }
  .tital {
    font-weight: bold;
    font-size: 18px;
    margin-left: 90px;
  }
  .returnlist {
    float: right;
    margin: -8px 0 0 10px;
  }
  .ordereditbtn {
    float: right;
    margin-top: -8px;
  }
}
</style>