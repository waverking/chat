<template>
  <div id="search-friend">
    <div class="graffiti"><img src="~assets/img/graffiti/graffiti.png" alt=""></div>
    <div class="none-friend">一个好友都没有</div>
    <div class="search" @click="toSearch">搜索好友</div>
  </div>
</template>

<script>
  import { toSearch } from "common/utils"
  export default {
    name:"SearchFriend",
    mixins:[toSearch]
  }
</script>

<style scoped>
  #search-friend {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .graffiti,.none-friend,.search {
    text-align: center;
  }
  .none-friend {
    margin-top: 20px;
    font-size: 14px;
    color: rgba(0, 0, 0, .6);
  }
  .search {
    margin: 20px auto;
    width: 130px;
    height: 46px;
    line-height: 46px;
    color: rgba(0, 0, 0, .6);
    background-color: #FFE431;
    font-size: 15px;
    border-radius: 30px;
  }
</style>