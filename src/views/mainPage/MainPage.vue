<template>
  <div class="main">
    <logo/>
    <home-button value='注册' class="register" @click.native="toRegister"/>
    <home-button value='登录' class="login" @click.native="toLogin"/>
  </div>
</template>

<script>
  import Logo from 'components/common/logo/Logo'
  import HomeButton from 'components/content/homebutton/HomeButton'
  export default {
    name:'MainPage',
    components:{
      Logo,
      HomeButton
    },
    methods:{
      toRegister () {
        this.$router.push({
          path:'/register'
        })
      },
      toLogin () {
        this.$router.push({
          path:'/login'
        })
      }
    }
  }
</script>

<style scoped>
  .main {
    position: absolute;
    top: 44%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 20px;
  }
  .register {
    margin: 40px 0;
  }
</style>