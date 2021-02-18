<template>
  <div style="height: 100%;">
    <div class="el-wrapper">
      <div class="el-content">
        <div class="search">
          <div class="sitem">
            <span class="demonstration">省</span>
            <el-select v-model="provinceid" placeholder="省" @change="getCities">
              <el-option
                v-for="option in provinces"
                :key="option.provinceid"
                :value="option.provinceid"
                :label="option.province"
              ></el-option>
            </el-select>
            <span class="demonstration">市</span>
            <el-select v-model="cityid" placeholder="市" @change="getAreas">
              <el-option
                v-for="option in cities"
                :key="option.cityid"
                :value="option.cityid"
                :label="option.city"
              ></el-option>
            </el-select>
            <span class="demonstration">区</span>
            <el-select v-model="areaid" placeholder="区">
              <el-option
                v-for="option in areas"
                :key="option.areaid"
                :value="option.areaid"
                :label="option.area"
              ></el-option>
            </el-select>
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
          <el-table-column prop="name" label="名称" min-width="12%"></el-table-column>
          <el-table-column prop="rate" label="评分" min-width="6%"></el-table-column>
          <el-table-column label="地区" min-width="12%">
            <template slot-scope="scope">{{scope.row.province + scope.row.city + scope.row.area}}</template>
          </el-table-column>
          <el-table-column prop="address" label="地址" min-width="15%"></el-table-column>
          <el-table-column prop="tel" label="电话" min-width="12%"></el-table-column>
          <el-table-column prop="item" label="服务" min-width="12%"></el-table-column>
          <el-table-column prop="opt" label="操作" min-width="12%">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
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
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-input v-model="form.rate" autocomplete="off" type="password"></el-input>
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
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务" :label-width="formLabelWidth">
          <el-input v-model="form.item" autocomplete="off"></el-input>
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
  name: "cinemalist",
  components: {},
  data() {
    return {
      createTime: "",
      count: 0,
      dialogVisible: false,
      tableData: [],
      provinces: [],
      cities: [],
      areas: [],
      provinceid: '',
      cityid: '',
      areaid: '',
      form: {
        id: 0,
        name: "",
        rate: "",
        provinceid: "",
        cityid: "",
        areaid: "",
        address: "",
        tel: "",
        item: ""
      },
      formLabelWidth: "50px",
      type: "",
      ids: ""
    };
  },
  created() {
    this.getProvinces();
    this.getCinemaList();
    this.$emit("getLoginMessage", true);
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
      this.form.name = this.tableData[index].name;
      this.form.rate = this.tableData[index].rate;
      this.form.provinceid = this.tableData[index].provinceid;
      this.form.cityid = this.tableData[index].cityid;
      this.form.areaid = this.tableData[index].areaid;
      this.form.address = this.tableData[index].address;
      this.form.tel = this.tableData[index].tel;
      this.form.item = this.tableData[index].item;
      this.type = "edit";
      this.getCities(this.form.provinceid);
      this.getAreas(this.form.cityid);
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;

      axios({
        method: "post",
        url: "/test/index.php/admin/CinemaInfo/del",
        data: qs.stringify({ ids: this.tableData[index].id })
      })
        .then(function(response) {
          console.log(response.data);
          if (response.data.response == "success") {
            that.$message({
              message: response.data.result,
              type: "success"
            });
            that.getCinemaList();
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
      this.getCinemaList(page);
    },
    getCinemaList(page) {
      let that = this;
      let data = {
        page: page || 1,
        num: 10,
        provinceid: this.provinceid,
        cityid: this.cityid,
        areaid: this.areaid
      };
      axios({
        method: "post",
        url: "/test/index.php/admin/CinemaInfo/search",
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
        url: "/test/index.php/admin/CinemaInfo/del",
        data: qs.stringify({ ids: this.ids })
      })
        .then(function(response) {
          if (response.data.response == "success") {
            that.$message({
              message: response.data.result,
              type: "success"
            });
            that.getCinemaList();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getProvinces() {
      let that = this;
      axios({
        method: "post",
        url: "/test/index.php/common/Region/getProvinces"
      })
        .then(function(response) {
          that.provinces = response.data;
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
        url: "/test/index.php/admin/CinemaInfo/edit",
        data: qs.stringify(this.form)
      })
        .then(function(response) {
          if (response.data.response == "success") {
            that.$message({
              message: response.data.result,
              type: "success"
            });
            that.dialogVisible = false;
            that.getCinemaList();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleAdd() {
      this.form.name = "";
      this.form.rate = "";
      this.form.provinceid = "";
      this.form.cityid = "";
      this.form.areaid = "";
      this.form.address = "";
      this.form.tel = "";
      this.form.item = "";
      this.type = "add";
      this.dialogVisible = true;
    },
    add() {
      let that = this;
      axios({
        method: "post",
        url: "/test/index.php/admin/CinemaInfo/add",
        data: qs.stringify(this.form)
      })
        .then(function(response) {
          if (response.data.response == "success") {
            that.$message({
              message: response.data.result,
              type: "success"
            });
            that.dialogVisible = false;
            that.getCinemaList();
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
      this.getCinemaList();
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
.sitem .el-select {
  width: 90px;
  margin-right: 10px;
}
</style>
