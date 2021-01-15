<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
</style>
