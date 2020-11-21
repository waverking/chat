<template>
  <div id="add-friend">
    <!-- 左边 --> 
    <div class="left">
      <div class="image">
        <img src="~assets/img/common/add-friend.svg" alt="">
        <div class="count">{{count}}</div>
      </div>
      <div class="request">好友请求</div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"AddFriend",
    props:{
      count:{
        type:Number,
        default () {
          return 0
        }
      }
    },
   
  }
</script>

<style scoped>
  #add-friend {
    height: 60px;
    /* border-bottom: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
  .left {
    display: flex;
    align-items: center;
    margin-left: 16px;
  }
  .left>.image {
    position: relative;
    width: 50px;
    height: 50px;
    line-height: 76px; 
    background-color: #FFE431 ;
    border-radius: 10px;
    text-align: center;
  }
  .image>img {
    width: 70%;
    height: 70%;
    opacity: .6;
  }
  /* 在不设置lh的情况下，子元素会继承父元素的lh，导致文本内容超出容器 */
  .image>.count {
    position: absolute;
    right: -6px;
    top: -6px; 
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 13px;
    color: #fff;
    border-radius: 50%;
    background-color: #FF5D5B ;
  }
  .request {
    margin-left: 16px;
  }
</style>