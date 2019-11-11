<template>
  <div class="modalbox" v-show="modal.show">
    <section>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="headcon">
            <img src="/images/modal.jpg" alt />
            <span>窜天猴提醒您</span>
          </span>
        </div>
        <div class="text item">
          <h3>{{modal.h3}}</h3>
          <p class="error">{{modal.error}}</p>
          <p>
            <el-button
              type="primary"
              round
              class="confirm"
              size="small"
              @click="onConfirm"
            >{{modal.text}} &emsp; {{modal.time}}s</el-button>
            <el-button round class="cancel" size="small" @click="onCancel" v-show="modal.close">取消</el-button>
          </p>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: {},
    };
  },
  created() {
    this.bus.$on("bybus", msg => {
      let { rst, text, hash, close } = msg;
      if(close===undefined){close=true};
      if(text===undefined){text="确定"};
      if(hash===undefined){hash=""}
      this.modal = {
        show: true,
        h3: rst.msg,
        error: rst.err,
        text,
        hash,
        close,
        time: 6
      };
    });

    let timer = setInterval(() => {
      if (this.modal.show) {
        this.modal.time--;
        // console.log("hash",this.modal.hash);
        if (this.modal.time <= 0) {
          if (this.modal.hash !== "") {
            this.$router.push(this.modal.hash);
          }

          this.modal.show = false;
        }
      }
    }, 1000);
  },
  methods: {
    onCancel() {
      this.modal.show = false;
    },
    onConfirm() {
      this.modal.show = false;
      if (this.modal.hash !== "") {
        this.$router.push(this.modal.hash);
      }
    }
  }
};
</script>

<style lang="less">
.modalbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  background-color: rgba(230, 230, 230, 0.5);
  section {
    width: 400px;
    position: absolute;
    z-index: 999;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -130px;
    background-color: #fff;
    border: 3px solid #409eff;
    border-radius: 30px;
    box-sizing: border-box;
    overflow: hidden;

    .el-card__header {
      background-color: #f6f6f6;
      padding: 0 30px;
      cursor: default;
      .headcon {
        display: flex;
        justify-content: flex-start;
        img {
          width: 50px;
          height: 50px;
        }
        span {
          margin-left: 20px;
          font-size: 18px;
          line-height: 50px;
          font-weight: bold;
          color: #409eff;
        }
      }
    }
    .el-card__body {
      h3 {
        line-height: 50px;
        font-size: 24px;
        font-weight: bold;
        color: #409eff;
      }
      .error {
        line-height: 26px;
        font-size: 14px;
        color: red;
      }
      .confirm,
      .cancel {
        padding: 10px 25px;
        margin: 20px 18px;
      }
    }
  }
}
</style>