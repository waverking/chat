<template>
   <nav-bar class="container">
    <div slot="left" class="left" @click="goBack">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </nav-bar>
</template>

<script> 
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name:'LoginNavBar',
    components:{
      NavBar
    },
     methods:{
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
   .container {
    height: 30px;
    padding-top: 10px;
  }
  .left {
    text-align: left;
  }
</style>