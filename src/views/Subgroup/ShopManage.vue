<template>
  <div class="shopmanage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
      </div>
      <div class="text item">
        <el-form
          ref="shopManageForm"
          :model="shopForm"
          label-width="80px"
          :rules="rules"
          hide-required-asterisk
        >
          <el-form-item label="店铺名称" prop="shopname">
            <el-input v-model="shopForm.shopname"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="shopForm.address"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="shopForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="shopdesc">
            <el-input v-model="shopForm.shopdesc"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语" prop="slogan">
            <el-input v-model="shopForm.slogan"></el-input>
          </el-form-item>

          <el-form-item label="店铺分类" prop="category">
            <el-select v-model="shopForm.category" placeholder="请选择店铺类型">
              <el-option label="中餐" value="1"></el-option>
              <el-option label="西餐" value="2"></el-option>
              <el-option label="百货" value="3"></el-option>
              <el-option label="饮品" value="4"></el-option>
              <el-option label="甜食" value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="营业时间" prop="date">
            <el-time-picker
              is-range
              v-model="shopForm.date"
              value-format="HH:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>

          <el-form-item label="店铺特点" prop="feature">
            <el-checkbox-group v-model="shopForm.feature" class="checkbox">
              <el-checkbox label="品牌保证" name="type"></el-checkbox>
              <el-checkbox label="准时达" name="type"></el-checkbox>
              <el-checkbox label="窜天猴专送" name="type"></el-checkbox>
              <el-checkbox label="新铺开张" name="type"></el-checkbox>
              <el-checkbox label="外卖保" name="type"></el-checkbox>
              <el-checkbox label="开发票" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="配送费">
            <el-input-number v-model="shopForm.packingexpense" :min="0" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价">
            <el-input-number v-model="shopForm.minprice" :min="10" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item label="店铺头像" prop="shopAvatar">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="shopForm.shopAvatar" :src="serveApi + shopForm.shopAvatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="营业执照" prop="businessLicenseImg">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="shopForm.businessLicenseImg"
                :src="serveApi + shopForm.businessLicenseImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="产品经营许可证" prop="cateringServiceLicenseImg">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="shopForm.cateringServiceLicenseImg"
                :src="serveApi + shopForm.cateringServiceLicenseImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="优惠活动">
            <el-select v-model="shopForm.specialOffer" @change="handleChange" placeholder="请选择优惠活动">
              <el-option label="满减优惠" value="满减优惠"></el-option>
              <el-option label="特惠大酬宾" value="特惠大酬宾"></el-option>
              <el-option label="新用户立减" value="新用户立减"></el-option>
              <el-option label="进店领券" value="进店领券"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="tab">
            <el-table :data="shopForm.tableData">
              <el-table-column prop="title" label="活动标题" width="100"></el-table-column>
              <el-table-column prop="name" label="活动名称" width="180"></el-table-column>
              <el-table-column prop="detail" label="活动详情" width="200"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deletetab(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">保 存</el-button>
          </el-form-item>
        </el-form>

        <!-- 模态框 -->
        <el-dialog width="400px" title="优惠活动" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rulesTab" hide-required-asterisk ref="detailForm">
            <el-form-item label="活动详情" prop="detail">
              <el-input size="small" v-model="form.detail" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { checktel } from "@/utils/reg.js";
import { $shopinfo, $shopedit } from "@/api/shop.js";

export default {
  data() {
    return {
      serveApi: "http://172.16.11.201:5000/upload/shop/",
      uploadImgApi: "http://172.16.11.201:5000/shop/upload",
      shopForm: {
        shopname: "", // 名称
        address: "", // 地址
        phone: "", // 电话
        shopdesc: "", // 描述
        slogan: "", // 标语
        category: "", // 分类
        feature: [], // 特色
        packingexpense: 0, // 配送费
        minprice: 20, // 起送价
        date: [], // 营业时间
        shopAvatar: "", // 店铺头像
        businessLicenseImg: "", // 营业执照
        cateringServiceLicenseImg: "", // 餐饮服务许可证
        specialOffer: "",
        // 优惠活动表格
        tableData: []
      },
      // 活动详情提示框
      form: {
        detail: ""
      },
      dialogFormVisible: false, // 模态框
      rulesTab: {
        detail: {
          required: true,
          message: "活动详情不能为空！",
          trigger: "blur"
        }
      },
      rules: {
        phone: checktel,
        shopname: {
          required: true,
          message: "店铺名称不能为空！",
          trigger: "blur"
        },
        address: {
          required: true,
          message: "店铺地址不能为空！",
          trigger: "blur"
        },
        shopdesc: {
          required: true,
          message: "店铺简介不能为空！",
          trigger: "blur"
        },
        slogan: {
          required: true,
          message: "店铺标语不能为空！",
          trigger: "blur"
        },
        category: {
          required: true,
          message: "请选择店铺类型！",
          trigger: "blur"
        },
        date: {
          required: true,
          message: "请选择营业时间！",
          trigger: "blur"
        },
        feature: {
          required: true,
          message: "请选择店铺特点！",
          trigger: "blur"
        },
        shopAvatar: {
          required: true,
          message: "请上传店铺头像！",
          trigger: "blur"
        },
        businessLicenseImg: {
          required: true,
          message: "请上传店铺营业执照！",
          trigger: "blur"
        },
        cateringServiceLicenseImg: {
          required: true,
          message: "请上传产品经营许可证！",
          trigger: "blur"
        }
      }
    };
  },
  created() {
    this.getShopInfo();
  },
  methods: {
    deletetab(index) {
      //console.log(index);
      this.shopForm.tableData.splice(index, 1);
    },
    confirm() {
      this.$refs.detailForm.validate(async valid => {
        //通过验证
        if (valid) {
          this.dialogFormVisible = false; // 关闭模态框

          let title;
          switch (this.shopForm.specialOffer) {
            case "满减优惠":
              title = "减";
              break;
            case "特惠大酬宾":
              title = "特";
              break;
            case "新用户立减":
              title = "新";
              break;
            case "进店领券":
              title = "领";
              break;
          }

          // 获取用户输入的值
          let newObj = {
            title,
            name: this.shopForm.specialOffer,
            detail: this.form.detail
          };

          // 加入表格
          this.shopForm.tableData.unshift(newObj);
          this.form = { detail: "" };
        }
      });
    },

    async getShopInfo() {
      let { data } = await $shopinfo();

      for (let key in data) {
        if (key === "date" || key === "feature" || key === "tableData") {
          data[key] = JSON.parse(data[key]);
        }
      }
      // 赋值渲染
      this.shopForm = { ...data };
    },
    handleChange() {
      //显示模态框
      this.dialogFormVisible = true;
    },

    async onSubmit() {
      this.$refs.shopManageForm.validate(async valid => {
        //通过验证
        if (valid) {
          let {
            shopname,
            address,
            phone,
            shopdesc,
            slogan,
            category,
            feature,
            packingexpense,
            minprice,
            date,
            shopAvatar,
            businessLicenseImg,
            cateringServiceLicenseImg,
            tableData
          } = this.shopForm;

          let params = {
            shopname,
            address,
            phone,
            shopdesc,
            slogan,
            category,
            feature: JSON.stringify(feature),
            packingexpense,
            minprice,
            date: JSON.stringify(date),
            shopAvatar,
            businessLicenseImg,
            cateringServiceLicenseImg,
            tableData: JSON.stringify(tableData)
          };

          let rst = await $shopedit(params);

          this.bus.$emit("bybus", {
            rst,
            close: false
          });
        } else {
          //没通过验证
          this.bus.$emit("bybus", {
            rst: { msg: "保存失败", err: "输入信息存在错误！" },
            close: false
          });
        }
      });
    },
    // 店铺头像
    handleAvatarSuccess1(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.shopForm.shopAvatar = imgUrl;
      }
    },
    // 营业执照
    handleAvatarSuccess2(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.shopForm.businessLicenseImg = imgUrl;
      }
    },
    // 餐饮服务许可证
    handleAvatarSuccess3(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.shopForm.cateringServiceLicenseImg = imgUrl;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt5M;
    }
  }
};
</script>

<style lang="less">
.shopmanage {
  .el-form {
    width: 350px;
    margin: 20px auto 0;
  }
  .el-card__header > div > span {
    font-size: 18px;
    font-weight: bold;
    cursor: default;
  }
  .el-select {
    width: 100%;
  }
  .el-checkbox-group {
    text-align: left;
  }
  .el-input.small {
    width: 80px;
  }
  .checkbox {
    width: 350px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
  .el-form {
    width: 350px;
    margin: 20px auto 0;
  }
  .tab {
    width: 660px;
    margin-left: -150px;
    cursor: default;
  }
}
</style>