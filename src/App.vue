<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Sidebar /> -->
  </div>
</template>

<script>
// import Sidebar from "./layout/Sidebar.vue";
export default {
  // components: { Sidebar },
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
