<template>
  <div class="goodsedit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="tital">修改商品</span>
        <el-button class="returnlist" size="small" @click="returnList">返回列表</el-button>
      </div>
      <div class="text item">
        <el-form
          ref="goodsAddForm"
          :rules="rules"
          hide-required-asterisk
          :model="goodsAddForm"
          label-width="80px"
        >
          <el-form-item label="商品名称" prop="goodsname">
            <el-input v-model="goodsAddForm.goodsname"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <el-select v-model="goodsAddForm.goodscategory" placeholder="请选择商品分类">
              <el-option label="中餐" value="中餐"></el-option>
              <el-option label="西餐" value="西餐"></el-option>
              <el-option label="火锅麻辣烫" value="火锅麻辣烫"></el-option>
              <el-option label="干锅香锅" value="干锅香锅"></el-option>
              <el-option label="甜点蛋糕" value="甜点蛋糕"></el-option>
              <el-option label="奶茶咖啡" value="奶茶咖啡"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品特点" prop="goodsfeature">
            <el-checkbox-group v-model="goodsAddForm.goodsfeature" class="checkbox">
              <el-checkbox label="新品上市" name="type"></el-checkbox>

              <el-checkbox label="主打产品" name="type"></el-checkbox>
              <el-checkbox label="火爆产品" name="type"></el-checkbox>
              <el-checkbox label="祖传手艺" name="type"></el-checkbox>
              <el-checkbox label="源自四川" name="type"></el-checkbox>
              <el-checkbox label="第二单半价" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品图片" prop="imgUrl">
            <el-upload
              class="avatar-uploader"
              action="http://172.16.11.201:5000/goods/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="goodsAddForm.imgUrl" :src="imgAPI + goodsAddForm.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="是否促销">
            <el-radio-group v-model="goodsAddForm.isPromotion">
              <el-radio label="不促销"></el-radio>
              <el-radio label="促销"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="食品规格" prop="goodsstandard">
            <el-radio-group v-model="goodsAddForm.goodsstandard">
              <el-radio label="单规格"></el-radio>
              <el-radio label="多规格"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="包装费" v-show="goodsAddForm.goodsstandard==='单规格'">
            <el-input-number v-model="goodsAddForm.packingexpense" :min="1" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="价格" v-show="goodsAddForm.goodsstandard==='单规格'">
            <el-input-number v-model="goodsAddForm.goodsPrice" :min="10" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item v-show="goodsAddForm.goodsstandard==='多规格'">
            <el-button type="primary" @click="addSpecs">添加规格</el-button>
          </el-form-item>
          <el-form-item class="tab" v-show="goodsAddForm.goodsstandard==='多规格'">
            <el-table :data="goodsAddForm.tableData">
              <el-table-column prop="goodsstandard" label="规格" width="100"></el-table-column>
              <el-table-column prop="packingexpense" label="包装费" width="70"></el-table-column>
              <el-table-column prop="goodsPrice" label="价格" width="70"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="delstandard(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="商品描述" prop="goodsdesc">
            <el-input type="textarea" v-model="goodsAddForm.goodsdesc"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="onSubmit">保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 多规格添加规格模态框 -->
      <el-dialog width="460px" title="添加规格" :visible.sync="dialogFormVisible" class="addspecs">
        <el-form
          style="width: 297px;"
          :model="addStandardForm"
          hide-required-asterisk
          :rules="rulesadd"
        >
          <el-form-item label="规格" label-width="80px" prop="goodsstandard">
            <el-input v-model="addStandardForm.goodsstandard" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item item label="包装费" label-width="80px">
            <el-input-number v-model="addStandardForm.packingexpense" :min="1" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item item label="价格" label-width="80px">
            <el-input-number v-model="addStandardForm.goodsPrice" :min="10" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="closeAddSpecs">取 消</el-button>
          <el-button type="primary" @click="confirmAddSpecs">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { $goodsEdit } from "@/api/goods.js";

export default {
  data() {
    const validategoods = (rule, value, callback) => {
      if (
        this.goodsAddForm.goodsstandard === "多规格" &&
        this.goodsAddForm.tableData.length === 0
      ) {
        callback(new Error(`多规格需要添加规格！`));
      } else {
        callback();
      }
      //console.log(this.goodsAddForm);
    };
    return {
      imgAPI: "http://172.16.11.201:5000/upload/goods/",
      // 商品表格
      goodsAddForm: {
        goodsname: "", // 商品名称
        goodscategory: "", // 商品分类
        goodsfeature: [], // 商品特色
        imgUrl: "", // 商品图片地址
        isPromotion: "不促销", // 是否促销
        goodsstandard: "单规格", // 单规格
        packingexpense: "", // 包装费
        goodsPrice: "", // 价格
        goodsdesc: "", // 商品描述
        // 多规格表格
        tableData: [
          /*  {
           goodsstandard: "默认", // 规格
            packingexpense: "0", // 包装费
            goodsPrice: "20" // 价格 
          }*/
        ]
      },
      // 添加规格表单
      addStandardForm: {
        goodsstandard: "", // 规格
        packingexpense: "", // 包装费
        goodsPrice: "" // 价格
      },
      dialogFormVisible: false, //添加规格  模态框  显示隐藏
      rulesadd: {
        goodsstandard: {
          required: true,
          message: "规格名称不能为空！",
          trigger: "blur"
        }
      },
      rules: {
        goodsname: {
          required: true,
          message: "商品名称不能为空！",
          trigger: "blur"
        },

        goodsfeature: {
          required: true,
          message: "请为此商品选择特点！",
          trigger: "blur"
        },
        imgUrl: {
          required: true,
          message: "请上传商品图片！",
          trigger: "blur"
        },
        goodsdesc: {
          required: true,
          message: "请描述你的商品特点！",
          trigger: "blur"
        },
        goodsstandard: {
          validator: validategoods,
          trigger: "blur"
        }
      }
    };
  },
  created() {
    let goodsData = JSON.parse(window.sessionStorage.getItem("goods"));
    goodsData.goodsfeature = JSON.parse(goodsData.goodsfeature);
    goodsData.standard = JSON.parse(goodsData.standard);

    if (
      goodsData.standard.length === 1 &&
      goodsData.standard[0].goodsstandard === "单规格"
    ) {
      goodsData.goodsstandard = "单规格";
      goodsData.packingexpense = goodsData.standard[0].packingexpense;
      goodsData.goodsPrice = goodsData.standard[0].goodsPrice;
      goodsData.tableData = [];
    } else {
      goodsData.goodsstandard = "多规格";
      goodsData.tableData = goodsData.standard;
      goodsData.packingexpense = 1;
      goodsData.goodsPrice = 10;
    }
    delete goodsData.standard;
    this.goodsAddForm = goodsData;
  },
  methods: {
    //保存

    async onSubmit() {
      this.$refs.goodsAddForm.validate(async valid => {
        //通过验证
        if (valid) {
          let params = {
            id: this.goodsAddForm.id,
            goodsname: this.goodsAddForm.goodsname,
            goodscategory: this.goodsAddForm.goodscategory,
            goodsfeature: JSON.stringify(this.goodsAddForm.goodsfeature),
            imgUrl: this.goodsAddForm.imgUrl,
            isPromotion: this.goodsAddForm.isPromotion,
            standard:
              this.goodsAddForm.goodsstandard === "单规格"
                ? JSON.stringify([
                    {
                      goodsstandard: this.goodsAddForm.goodsstandard,
                      packingexpense: this.goodsAddForm.packingexpense,
                      goodsPrice: this.goodsAddForm.goodsPrice
                    }
                  ])
                : JSON.stringify(this.goodsAddForm.tableData),
            goodsdesc: this.goodsAddForm.goodsdesc
          };
          let hash = "";
          let text = "";
          let rst = await $goodsEdit(params);
          let close = false;
          if (rst.code === 0) {
            hash = "/home/goodslist";
            close = true;
            text = "商品列表";
          }
          this.bus.$emit("bybus", { rst, hash, close, text });
        } else {
          //没通过验证
          this.bus.$emit("bybus", {
            rst: { msg: "修改失败", err: "输入信息存在错误！" },
            close: false
          });
        }
      });
    },

    //图片上传成功
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.goodsAddForm.imgUrl = imgUrl;
      }
    },
    //图片上传前
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!(isPNG || isJPG)) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return (isPNG || isJPG) && isLt5M;
    },

    //多规格---添加规格
    addSpecs() {
      this.dialogFormVisible = true;
    },
    //多规格取消
    closeAddSpecs() {
      this.dialogFormVisible = false;
    },
    //多规格添加
    confirmAddSpecs() {
      this.$refs.addStandardForm.validate(async valid => {
        if (valid) {
          //通过验证
          this.goodsAddForm.tableData.unshift(this.addStandardForm);
          this.addStandardForm = {
            goodsstandard: "",
            packingexpense: "",
            goodsPrice: ""
          };
          this.dialogFormVisible = false;
        }
      });
    },
    //多规格删除
    delstandard(index) {
      this.goodsAddForm.tableData.splice(index, 1);
    },
    returnList() {
      this.$router.push("/home/goodslist");
    }
  }
};
</script>

<style lang="less">
.goodsedit {
  .el-form {
    width: 350px;
    margin: 20px auto 0;
  }
  .el-card__header > div > span {
    font-size: 18px;
    font-weight: bold;
    cursor: default;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-cascader {
    width: 270px;
  }
  .el-select {
    width: 100%;
  }
  .el-checkbox-group {
    width: 350px;
  }
  .tab {
    width: 420px;
    margin-left: -30px;
    cursor: default;
  }
  .addspecs {
    .el-input-number {
      width: 217px;
    }
  }
  .returnlist {
    float: right;
    margin: -8px 0 0 10px;
  }
  .tital {
    font-weight: bold;
    font-size: 18px;
    margin-left: 90px;
  }
  .el-textarea__inner {
    min-height: 90px !important;
  }
}
</style>