<template>
  <div class="avator-item">
    <img :src="avatorItem.avator">
  </div>
</template>

<script>
  export default {
    name:"AvatorItem",
    props:{
      avatorItem:{
        type:Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .avator-item {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 10px;
    overflow: hidden;
  }
  .avator-item img {
    width: 100%;
    height: 100%;
  }
</style>