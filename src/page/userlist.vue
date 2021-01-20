<template>
  <div style="height: 100%;">
    <sideBar></sideBar>
    <div class="el-wrapper">
      <div class="el-content">
        <div class="search">
          <div class="sitem">
            <span class="demonstration">创建时间</span>
            <el-date-picker v-model="createTime" type="date" placeholder="选择日期"></el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
        <el-table
          class="tableBox"
          ref="multipleTable"
          :data="tableData"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          height="450"
          stripe
          style="width: 100%;margin-top: 40px;"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="id" min-width="12%"></el-table-column>
          <el-table-column prop="username" label="姓名" min-width="12%"></el-table-column>
          <el-table-column prop="sex" label="性别" min-width="12%"></el-table-column>
          <el-table-column prop="reg_time" label="日期" min-width="12%"></el-table-column>
          <el-table-column prop="area" label="地区" min-width="12%"></el-table-column>
          <el-table-column prop="opt" label="操作" min-width="12%">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>-->
          <el-button type="danger" @click="deleteAll()">批量删除</el-button>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="count"
          @current-change="handlePage"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-select v-model="form.area" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import sideBar from "./sidebar";

export default {
  name: "userlist",
  components: {
    sideBar
  },
  data() {
    return {
      createTime: "",
      count: 0,
      dialogVisible: false,
      tableData: [],
      form: {
        area: "",
        sex: "1",
        username: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "even-row";
      } else {
        return "odd-row";
      }
      return "";
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePage(page) {
      this.getUserList(page);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getUserList(page) {
      let that = this;
      let data = {
        page: page || 1,
        num: 10
      };
      axios({
        method: "post",
        url: "/test/index.php/admin/UserInfo/search",
        data: qs.stringify(data)
      })
        .then(function(response) {
          console.log(response.data.datalist);
          that.count = response.data.count;
          console.log(that.count);
          that.tableData = response.data.datalist;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteAll() {}
  }
};
</script>

<style scoped lang="scss">
.el-col {
  background-color: rgb(84, 92, 100);
}
.el-col h5 {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 20px;
}
.el-table /deep/ .even-row {
  background: #fff;
}

.el-table /deep/ .odd-row {
  background: #fff;
}
.el-wrapper {
  width: calc(100% - 200px);
  height: 100%;
  position: absolute;
  left: 200px;
  background-color: rgb(242, 242, 242);
  padding: 20px;
  box-sizing: border-box;
  .el-content {
    background-color: #fff;
    padding: 40px;
    .search {
      text-align: center;
      .sitem {
        display: inline-block;
        .demonstration {
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
    .tableBox /deep/ {
      th,
      td {
        padding: 0 !important;
        height: 40px;
        line-height: 40px;
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
.el-dialog .el-input {
  width: 200px;
  margin-left: 10px;
}
.el-dialog .el-select {
  width: 200px;
  margin-left: 10px;
}

</style>
