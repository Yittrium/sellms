<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <div>
        <table>
          <tr>
            <td>ID：</td>
            <td>{{personalInfo.id}}</td>
          </tr>
          <tr>
            <td>账号：</td>
            <td>{{personalInfo.acc}}</td>
          </tr>
          <tr>
            <td>职位：</td>
            <td>{{personalInfo.power}}</td>
          </tr>
          <tr>
            <td>创建时间：</td>
            <td>{{personalInfo.createtime}}</td>
          </tr>
          <tr>
            <td>头像：</td>
            <td>
              <el-upload
                class="avatar-uploader"
                action="http://172.16.11.201:5000/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="personalInfo.imgUrl" :src="imgAPI + personalInfo.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button type="success" @click="edit">保存修改头像</el-button>
            </td>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { $personal, $personalimg } from "@/api/account.js";
import moment from "moment";

export default {
  data() {
    return {
      imgAPI: "http://172.16.11.201:5000/upload/account/",
      personalInfo: {}
    };
  },
  methods: {
    async personalList() {
      let { personalInfo } = await $personal();

      personalInfo.createtime = moment(personalInfo.createtime).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      this.personalInfo = personalInfo;
    },
    async edit() {
      let rst = await $personalimg({ imgUrl: this.personalInfo.imgUrl });
      this.bus.$emit("bybus", { rst, close: false });
      this.bus.$emit("update", "update");
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.personalInfo.imgUrl = imgUrl;
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
    }
  },
  created() {
    this.personalList();
  }
};
</script>

<style lang="less" scoped>
.el-form {
  width: 350px;
  margin: 20px auto 0;
}
.el-card__header span {
  font-size: 18px;
  font-weight: bold;
  cursor: default;
}
table {
  margin: 0 auto;

  tr:last-child {
    td {
      line-height: 115px;
    }
    td:last-child img {
      width: 100px;
      height: 100px;
      vertical-align: middle;
    }
  }
  td {
    line-height: 36px;
    font-size: 16px;
    &:first-child {
      text-align: right;
      padding-right: 20px;
    }
    &:last-child {
      text-align: left;
    }
  }
}
</style>