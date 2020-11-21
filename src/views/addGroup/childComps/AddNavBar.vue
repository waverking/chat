<template>
  <nav-bar class="nav-bar">
    <div slot="left" class="left" @click="back">取消</div>
    <div slot="center" class="center">创建群聊</div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name:"AddNavBar",
    components:{
      NavBar
    },
    methods:{
      back () {
        this.$router.back()
      }
    }
    
  }
</script>

<style scoped>
  .nav-bar {
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  }
  .left {
    padding-right: 16px;
  }
  .center {
    font-size: 18px;
  }
</style>