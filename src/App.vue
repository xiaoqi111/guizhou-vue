<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "/assets/css/reset.css";
#app {
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,li,ol{
  list-style: none;
}
strong,em,i {
  font-style: normal;
}
a {
  text-decoration: none;
  color: inherit;
}
.el-progress-bar__outer{
  background-color: transparent;
}
</style>
