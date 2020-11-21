<template>
  <div id="avator">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:"Avator"
  }
</script>

<style scoped>
  #avator {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 90%;
  }
</style>