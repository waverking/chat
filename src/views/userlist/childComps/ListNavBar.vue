<template>
  <nav-bar>
    <div slot="left" class="left"><img :src="myAvator" alt=""></div>
    <div slot="center" class="center"><img src="~assets/img/logo/logo.png" alt=""></div>
    <div slot="right" class="right">
      <img src="~assets/img/common/search.png" alt="" class="test" @click="toSearch">
      <img src="~assets/img/common/add-group.png" alt="" @click="addGroup">
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import { toSearch } from "common/utils"
  export default {
    name:"ListNavBar",
    props:{
      myAvator:{
        type:String,
        default() {
          return ''
        }
      }
    },
    components:{
      NavBar
    },
    mixins:[toSearch],
    methods:{
      addGroup () {
        this.$router.push({
          path:'/addGroup',
          query:{
            uid:this.$route.query.uid
          }
        })
      }
    }
  }
</script>

<style scoped>
  .left {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 14px;
  }
  .left img{
    width: 100%;
    height: 100%
  }
  .center {
    margin-top: 14px;
  }
  .center img{
    width: 22%;
  }
  .right {
    display: flex;
    justify-content: start;
  }
  .right>img:first-child {
    margin-right: 16px;
  }
</style>