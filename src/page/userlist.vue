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
        <el-table :data="tableData" style="width: 100%;margin-top: 40px;" :row-class-name="tableRowClassName">
          <el-table-column prop="id" label="id" min-width="12%"></el-table-column>
          <el-table-column prop="area" label="地区" min-width="12%"></el-table-column>
          <el-table-column prop="sex" label="性别" min-width="12%"></el-table-column>
          <el-table-column prop="reg_time" label="日期" min-width="12%"></el-table-column>
          <el-table-column prop="username" label="姓名" min-width="12%"></el-table-column>
        </el-table>
      </div>
    </div>
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
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    getUserList() {
      var that = this;
      axios({
        method: "get",
        url: "/api/index.php/admin/UserInfo/index"
      })
        .then(function(response) {
          console.log(response.data.datalist);
          that.tableData = response.data.datalist;
        })
        .catch(function(error) {
          console.log(error);
        });
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
.el-table /deep/ .warning-row {
  background: oldlace;
}

.el-table /deep/ .success-row {
  background: #f0f9eb;
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
    .search{
      text-align: center;
      .sitem{
      display: inline-block;
        .demonstration{
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
    
  }
}
</style>
