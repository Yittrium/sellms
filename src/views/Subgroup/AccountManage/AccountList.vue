<template>
  <div class="accList">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <div class="text item">
        <el-table
          ref="accListTable"
          tooltip-effect="dark"
          style="width: 100%"
          :data="tableData"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="acc" label="账号" width="150"></el-table-column>

          <el-table-column prop="power" label="职位" width="150"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="450">
            <template slot-scope="scope">{{ scope.row.createTime}}</template>
          </el-table-column>

          <el-table-column width="250" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="warning" @click="resetPwd(scope.row)">重置密码</el-button>
              <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 8, 10,12]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>

        <div>
          <el-button type="danger" @click="batchDel" round size="small">批量删除</el-button>
          <el-button type="info" round @click="cancelSelect" size="small">取消选择</el-button>
        </div>

        <!-- 编辑模态框 -->
        <el-dialog width="460px" title="编辑账号" :visible.sync="dialogFormVisible">
          <el-form
            style="width: 297px;"
            :model="editForm"
            :rules="rules"
            hide-required-asterisk
            ref="formEdit"
          >
            <el-form-item label="账号" label-width="80px" prop="acc">
              <el-input v-model="editForm.acc" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item item label="职位" label-width="80px">
              <el-select v-model="editForm.power" placeholder="请选择用户组">
                <el-option label="员工" value="员工"></el-option>
                <el-option label="老板" value="老板"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  $accList,
  $accDel,
  $accDels,
  $editAcc,
  $resetPwd
} from "@/api/account.js";
//时间格式化
import moment from "moment";
// 引入验证
import { checkacc } from "@/utils/reg.js";
import local from "@/utils/local";

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 5,
      currentPage: 1,
      dialogFormVisible: false, // 控制编辑模态框的显示和隐藏
      ids: [], // 被选中的数据

      // 编辑表单
      editForm: { acc: "", power: "" },
      rules: {
        acc: checkacc
      }
    };
  },
  created() {
    this.gainList();
  },
  methods: {
    //重置密码
    resetPwd(row) {
      this.$confirm(
        "确定要重置此账号的密码吗？重置密码后默认密码为：cth123",
        "此操作不可逆！",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          let rst = await $resetPwd({ id: row.id });
          //console.log(rst);
          this.bus.$emit("bybus", { rst,close:false});
          this.gainList();
        })
        .catch(() => {});
    },
    //取消选择
    cancelSelect() {
      this.$refs.accListTable.clearSelection();
    },

    //获取，刷新列表
    async gainList() {
      //请求
      let { total, data } = await $accList({
        pageSize: this.pageSize,
        curPage: this.currentPage
      });
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1; // 当前页码减去1
        this.gainList(); // 再次请求数据
      }
      //时间格式化
      data.forEach(v => {
        v.createTime = moment(v.createTime).format("YYYY-MM-DD hh:mm:ss");
      });

      //返回数据赋值
      this.tableData = data;
      this.total = total;
    },
    //显示条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.gainList();
    },
    // 当前页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.gainList();
    },
    //多选改变
    handleSelectionChange(rows) {
      //console.log(rows);
      this.ids = rows.map(row => row.id);
    },
    //编辑
    handleEdit(row) {
      // 赋值给编辑表单 回填数据
      this.editForm = { ...row };
      // 显示模态框
      this.dialogFormVisible = true;
    },
    //保存编辑
    saveEdit() {
      this.$refs.formEdit.validate(async valid => {
        //满足验证条件
        if (valid) {
          // 隐藏模态框
          this.dialogFormVisible = false;
          let { id, acc, power } = this.editForm;
          let rst = await $editAcc({ id, acc, power });
          this.bus.$emit("bybus", {rst,close:false});
          if (rst.code === 1) {
            this.gainList();
          }
        }
      });
    },
    //删除
    handleDel(row) {
      if (local.get("id") === row.id) {

        this.bus.$emit("bybus", { rst:{ msg: "无效操作", err: "不能删除自己的账号" },close:false});
        return;
      }

      this.$confirm("确定要删除此账号吗？", "此操作不可逆！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let rst = await $accDel({ id: row.id });
          this.bus.$emit("bybus", { rst,close:false});
          this.gainList();
        })
        .catch(() => {});
    },
    //批量删除
    batchDel() {
      let id = JSON.parse(localStorage.getItem("user")).id;

      if (!this.ids.length) {
        this.bus.$emit("bybus", {
          rst: { msg: "无效操作", err: "选中才能进行批量删除" },close:false
        });
        return;
      } else if (this.ids.some(v => v === id)) {
        let rst = { msg: "无效操作", err: "不能删除自己的账号" };
        this.bus.$emit("bybus", { rst,close:false});
        return;
      }

      this.$confirm("确定要删除选中的所有账号吗？", "此操作不可逆！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let rst = await $accDels({ ids: JSON.stringify(this.ids) });
          this.bus.$emit("bybus", { rst,close:false});
          this.gainList();
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less">
.accList {
  .el-form {
    width: 350px;
    margin: 20px auto 0;
  }
  .el-card__header > div > span {
    font-size: 18px;
    font-weight: bold;
    cursor: default;
  }
  .el-table td,
  .el-table th {
    text-align: center;
  }
  .el-pagination {
    margin: 20px 0;
  }
  .el-dialog__title {
    font-weight: bold;
  }
  .el-dialog {
    width: 420px !important;
  }
  .disable {
    cursor: not-allowed;
  }
}
</style>