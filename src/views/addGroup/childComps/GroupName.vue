<template>
  <div class="name">
    <input type="text" placeholder="请输入群聊名称" @change="inputName" ref="name">
  </div>
</template>

<script>
  export default {
    name:'GroupName',
    methods:{
      inputName () {
        this.$bus.$emit('inputName',this.$refs.name.value)
      }
    }
  }
</script>

<style scoped>
  .name {
    display: flex;
    justify-content: center;
    height: 40px;
  }
  .name input {
    height: 100%;
    width: 94%;
    border-radius: 20px;
    border: none;
    outline: none;
    background-color: #F3F4F6;
    text-align: center;
    font-size: 17px;
  }
</style>