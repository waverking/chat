<template>
  <div id="login">
    <login-nav-bar/>
    <logo class="login"/>
    <user-info title="登录" ref="user"/>
    <home-button class="user-button" value="登录" @click.native="Login"/>
  </div>
</template>

<script>
  import Logo from "components/common/logo/Logo"
  import UserInfo from "components/content/userinfo/UserInfo"
  import HomeButton from "components/content/homebutton/HomeButton"

  import LoginNavBar from './childComps/LoginNavBar'

  import { getUserInfo } from "common/utils"
  import { Login } from "network/login";
  export default {
    name:"Login",
    data() {
      return {
        isShow:false,
      }
    },
    components:{
      Logo,
      UserInfo,
      HomeButton,
      LoginNavBar
    },
    mixins:[getUserInfo],
    methods:{
      Login() {
        Login(this.getUserInfo()).then(res => {
          res.data.flag === false ? this.$toast.showMessage('用户信息有误') : 
                                    this.$router.push({
                                      path:"/userlist",
                                      query:{uid:res.data._id}
                                    })
        })
      },
    },
  } 
</script>

<style scoped>
  .login {
    margin-top: 40px;
  }
  .user-button {
    margin-top: 60px;
  }
</style>