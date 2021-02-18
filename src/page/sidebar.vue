<template>
<!-- <el-row class="tac" style="height:100%;"> -->
  <el-col :span="4" style="width: 200px;height:100%;">
    <h5>后台管理系统</h5>
    <el-menu
      :default-active="this.$route.path"
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userlist">用户列表</el-menu-item>
          <el-menu-item index="/filmlist">影片列表</el-menu-item>
          <el-menu-item index="/cinemalist">影院列表</el-menu-item>
          <el-menu-item index="1-4">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>统计管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">用户分布</el-menu-item>
          <el-menu-item index="2-2">影片排行</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
<!-- </el-row> -->


</template>

<script>
export default {
    name: 'sidebar',
    data() {
        return {

        }
    },
    created() {
      console.log(this)
    },
    props: {
      activeIndex: {
        type: String,
        default: ''
      }
    },
    methods:{
        handleOpen(key, keyPath) {

        },
        handleClose(key, keyPath) {

        }
    }
}
</script>

<style scoped>
.el-col{
  background-color: rgb(84, 92, 100);
}
.el-col h5{
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 20px;
}
</style>
