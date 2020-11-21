<template>
  <div class="toast" v-if="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow:false
    }
  },
  methods:{
    showMessage (message = '尚有未填项',duration = 1500) {
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, duration);
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 140px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 16px;
    color: white;
    background-color :rgba(0, 0, 0, .4);
    border-radius: 16px;
  }
</style>