<template>
  <div id="app">
    <sideBar v-if="isLogin"></sideBar>
    <router-view @getLoginMessage="getLoginMessage"/>
  </div>
</template>

<script>
import sideBar from "./page/sidebar";
export default {
  name: 'App',
  components: {
    sideBar
  },
  data() {
    return {
      isLogin: false
    }
  },
  methods: {
    getLoginMessage(val) {
      this.isLogin = val;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.clearfix:after{
  display: block;
	content: ".";
	height: 0;
	visibility: hidden;
	clear: both;
	font-size: 0;
	line-height: 0;
}
ul,li{
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
body {
  height: 100%;
}
a{
  color: inherit;
  text-decoration: none;
}
</style>
