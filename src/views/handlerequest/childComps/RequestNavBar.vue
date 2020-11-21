<template>
  <nav-bar class="request-nav-bar">
    <div slot="left" class="left"> 
      <img src="~assets/img/common/arrow-left.svg" alt="" @click="back">
      <span>新的朋友</span>
    </div>
    <div slot="right" class="right" @click="toSearch">添加朋友</div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {toSearch} from 'common/utils'
  export default {
    name:'RequestNavBar',
    components:{
      NavBar
    },
    methods:{
      back () {
        this.$router.back()
      }
    },
    mixins:[toSearch]
  }
</script>

<style scoped>
  .request-nav-bar {
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  }
  .left {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .right {
    padding-right: 8px;
  }
</style>>

</style>