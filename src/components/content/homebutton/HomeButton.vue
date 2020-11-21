<template>
  <div id="button">
    <input type="button" class="button" :value="value">
  </div>
</template>

<script>
  export default {
    name:"HomeButton",
    props:{
      value:{
        type:String,
        default() {
          return ""
        }
      }
    }
  }
</script>

<style scoped>
  #button {
    display: flex;
    justify-content: center;
  }
  .button {
    width: 280px;
    height: 50px;
    border-radius: 24px;
    outline: none;
    border: none;
    color: #ffffff;
    background: #FFE431;
    font-size: 18px;
  }
</style>