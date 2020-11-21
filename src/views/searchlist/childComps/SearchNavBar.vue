<template>
  <nav-bar>
    <div slot="left" class="left">
      <input type="text" @input="searchUser" ref="inputValue">
      <img src="~assets/img/common/search.png" alt="">
    </div>
    <div slot="right" class="right" @click="goBack">取消</div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  export default {
    name:"SearchNavBar",
    components:{
      NavBar
    },
    methods:{
      goBack() {
        this.$router.go(-1)
      },
      searchUser() {
        this.$emit("reShowUsers",this.$refs.inputValue.value)
      }
    }
  }
</script>

<style scoped>
  .left {
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 10px;
    background-color: #F3F4F6 ;
    width: 298px;
    height: 30px;
    margin: 16px 0 0 16px;
  }
  .left input {
    width: 92%;
    outline:none;
    border: none;
    background-color: #F3F4F6 ;
  }
  .left img {
    width: 20px;
    height: 20px;
    opacity: .4;
  }
  .right {
    padding-top: 14px;
    margin-left: 8px;
    font-size: 15px;
    opacity: .8;
  }
</style>