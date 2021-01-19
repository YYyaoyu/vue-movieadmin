<template>
<div>
  <sideBar></sideBar>
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
    return {};
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      var that = this;
      axios({
        method: "get",
        url: "/api/index.php/admin/UserInfo/index",
      })
        .then(function(response) {
          console.log(response.data.datalist);
           
         
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
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
</style>