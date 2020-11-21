<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import MainPage from "views/mainPage/MainPage"
  export default {
    components:{
      MainPage
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
