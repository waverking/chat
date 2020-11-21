<template>
  <nav-bar class="main">
    <div class="left" slot="left">
      <img src="~assets/img/common/arrow-left.svg" alt="" @click="backToUserlist">
      <span>{{Name}}</span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from '../navbar/NavBar'
  export default {
    name:'ChatNavBar',
    props:{
      Name:{
        type:String,
        default () {
          return ''
        }
      }
    },
    components:{
      NavBar
    },
    methods:{
      backToUserlist () {
        this.$router.replace({
          path:'/userlist',
          query:{
            uid:this.$route.query.uid
          }
        })
      }
    }
  }
</script>

<style scoped>
  .main {
    box-shadow: 0 1px rgba(0, 0, 0, .2);
  }
  .left {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 140px;
    margin-left: 8px;
  }
  .left span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 6px;
  }
</style>