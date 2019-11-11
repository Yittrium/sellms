<template>
  <div class="goodslist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
      </div>
      <div class="text item">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 I D ：">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="是否促销：">
                  <span>{{ props.row.isPromotion }}</span>
                </el-form-item>
                <el-form-item label="商品名称：">
                  <span>{{ props.row.goodsname }}</span>
                </el-form-item>
                <el-form-item label="商品分类：">
                  <span>{{ props.row.goodscategory }}</span>
                </el-form-item>
                <el-form-item label="商品描述：">
                  <span>{{ props.row.goodsdesc }}</span>
                </el-form-item>
                <el-form-item label="商品特色：">
                  <span>{{ props.row.goodsfeature | filterFeature }}</span>
                </el-form-item>
                <el-form-item label="商品规格：">
                  <span>{{ props.row.standard | filterStandard }}</span>
                </el-form-item>
                <el-form-item label="商品图片：">
                  <span>
                    <img
                      width="100"
                      height="100"
                      style="border-radius: 4px"
                      :src="serveApi + props.row.imgUrl"
                    />
                  </span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品 ID" prop="id"></el-table-column>
          <el-table-column label="商品名称" prop="goodsname"></el-table-column>
          <el-table-column label="描述" prop="goodsdesc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="editGoods(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="delgoods(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
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
import { $getGoodsList, $goodsDel } from "@/api/goods";
export default {
  data() {
    return {
      serveApi: "http://172.16.11.201:5000/upload/goods/",
      tableData: [],
      total: 0,
      pageSize: 5,
      currentPage: 1
    };
  },
  methods: {
    //编辑
    editGoods(row) {
      window.sessionStorage.setItem("goods", JSON.stringify(row));
      this.$router.push("/home/goodslist/goodsedit");
    },
    //删除
    async delgoods(row) {
      let rst = await $goodsDel({ id: row.id });
      this.bus.$emit("bybus", { rst, close: false });
      this.getGoods();
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods();
    },
    // 获取列表
    async getGoods() {
      let { total, data } = await $getGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      this.total = total;
      this.tableData = data;
    }
  },
  created() {
    this.getGoods();
  },
  filters: {
    filterFeature(f) {
      return JSON.parse(f).join(" / ");
    },
    filterStandard(s) {
      let arr = JSON.parse(s);
      return arr
        .map(
          v =>
            `${v.goodsstandard} —— ￥ ${v.goodsPrice} + ￥ ${v.packingexpense}`
        )
        .join(" || ");
    }
  }
};
</script>

<style lang="less" scoped>
.goodslist {
  .el-form {
    width: 350px;
    margin: 20px auto 0;
  }
  .el-card__header > div > span {
    font-size: 18px;
    font-weight: bold;
    cursor: default;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-form {
    width: 700px;
  }
  .demo-table-expand .el-form-item {
    width: 350px;
  }
  .el-pagination {
    margin: 20px 0;
  }
}
</style>