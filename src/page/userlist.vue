<template>
  <div style="height: 100%;">
    <div class="el-wrapper">
      <div class="el-content">
        <div class="search">
          <div class="sitem">
            <span class="demonstration">创建时间</span>
            <el-date-picker v-model="createTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="changeTime"></el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button type="success" icon="el-icon-plus" style="float:right;" @click="handleAdd">新增</el-button>
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
          <el-table-column label="地区" min-width="12%">
            <template slot-scope="scope">{{scope.row.province + scope.row.city + scope.row.area}}</template>
          </el-table-column>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="410px">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-select v-model="form.provinceid" placeholder="省" @change="getCities">
            <el-option
              v-for="option in provinces"
              :key="option.provinceid"
              :value="option.provinceid"
              :label="option.province"
            ></el-option>
          </el-select>
          <el-select v-model="form.cityid" placeholder="市" @change="getAreas">
            <el-option
              v-for="option in cities"
              :key="option.cityid"
              :value="option.cityid"
              :label="option.city"
            ></el-option>
          </el-select>
          <el-select v-model="form.areaid" placeholder="区">
            <el-option
              v-for="option in areas"
              :key="option.areaid"
              :value="option.areaid"
              :label="option.area"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="type=='edit'?edit():add()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "userlist",
  components: {
  },
  data() {
    return {
      createTime: "",
      count: 0,
      dialogVisible: false,
      tableData: [],
      provinces: [],
      cities: [],
      areas: [],
      form: {
        id: 0,
        username: "",
        password: "",
        provinceid: "",
        cityid: "",
        areaid: "",
        sex: ""
      },
      formLabelWidth: "50px",
      type: "",
      ids: ""
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
      this.form.id = this.tableData[index].id;
      this.form.username = this.tableData[index].username;
      this.form.password = this.tableData[index].password;
      this.form.sex = this.tableData[index].sex;
      this.form.provinceid = this.tableData[index].provinceid;
      this.form.cityid = this.tableData[index].cityid;
      this.form.areaid = this.tableData[index].areaid;
      this.getProvinces();
      this.type = "edit";
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;

      axios({
        method: "post",
        url: "/test/index.php/admin/UserInfo/del",
        data: qs.stringify({ ids: this.tableData[index].id })
      })
        .then(function(response) {
          console.log(response.data);
          if (response.data.response == "success") {
            that.$message({
              message: response.data.result,
              type: "success"
            });
            that.getUserList();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
      this.ids = val
        .map(item => {
          return item.id;
        })
        .join(",");
    },
    handlePage(page) {
      this.getUserList(page);
    },
    getUserList(page) {
      let that = this;
      let data = {
        page: page || 1,
        num: 10,
        createTime: this.createTime
      };
      axios({
        method: "post",
        url: "/test/index.php/admin/UserInfo/search",
        data: qs.stringify(data)
      })
        .then(function(response) {
          that.count = response.data.count;
          that.tableData = response.data.datalist;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteAll() {
      let that = this;
      axios({
        method: "post",
        url: "/test/index.php/admin/UserInfo/del",
        data: qs.stringify({ ids: this.ids })
      })
        .then(function(response) {
          if (response.data.response == "success") {
            that.$message({
              message: response.data.result,
              type: "success"
            });
            that.getUserList();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getProvinces(value) {
      let that = this;
      axios({
        method: "post",
        url: "/test/index.php/common/Region/getProvinces"
      })
        .then(function(response) {
          that.provinces = response.data;
          that.getCities(that.form.provinceid);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCities(value) {
      let that = this;
      axios({
        method: "post",
        url: "/test/index.php/common/Region/getCities",
        data: qs.stringify({
          provinceid: value
        })
      })
        .then(function(response) {
          that.cities = response.data;
          that.getAreas(that.form.cityid);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAreas(value) {
      let that = this;
      axios({
        method: "post",
        url: "/test/index.php/common/Region/getAreas",
        data: qs.stringify({
          cityid: value
        })
      })
        .then(function(response) {
          that.areas = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    edit() {
      console.log(this.form);
      let that = this;
      axios({
        method: "post",
        url: "/test/index.php/admin/UserInfo/edit",
        data: qs.stringify(this.form)
      })
        .then(function(response) {
          if (response.data.response == "success") {
            that.$message({
              message: response.data.result,
              type: "success"
            });
            that.dialogVisible = false;
            that.getUserList();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleAdd() {
      this.getProvinces();
      this.form.username = "";
      this.form.password = "";
      this.form.sex = "";
      this.form.provinceid = "";
      this.form.cityid = "";
      this.form.areaid = "";
      this.type = "add";
      this.dialogVisible = true;
    },
    add() {
      let that = this;
      axios({
        method: "post",
        url: "/test/index.php/admin/UserInfo/add",
        data: qs.stringify(this.form)
      })
        .then(function(response) {
          if (response.data.response == "success") {
            that.$message({
              message: response.data.result,
              type: "success"
            });
            that.dialogVisible = false;
            that.getUserList();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeTime(val) {
      this.createTime = val;
    },
    search() {
      this.getUserList();
    }
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
  width: 298px;
  margin-left: 10px;
}
.el-dialog .el-form .el-select {
  width: 90px;
  margin-left: 10px;
}
.customWidth {
  width: 1000px;
}
</style>
