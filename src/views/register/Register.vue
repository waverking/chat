<template>
  <div>
    <register-nav-bar/>
    <logo class="logo"/>
    <user-info title="注册" ref="user" :isShowLabel="isShowLabel" @showLabel="showLabel"/>
    <register-avator :avators="avators" @chooseAvator="chooseAvator"/>
    <home-button class="user-button" value="注册" @click.native="Register"/>
  </div>
</template>

<script>
  import Logo from "components/common/logo/Logo"
  import HomeButton from "components/content/homebutton/HomeButton"
  import UserInfo from "components/content/userinfo/UserInfo"

  import RegisterAvator from "./childComps/RegisterAvator"
  import RegisterNavBar from './childComps/RegisterNavBar'
  import { getUserInfo } from "common/utils"

  import { register,getAvators } from "network/register"
  export default {
    name:"Register",
    data() {
      return {
        isShowLabel:false,
        avators:[],
        avatorSrc:'',
      }
    },
    mixins:[getUserInfo],
    components:{
      Logo,
      HomeButton,
      UserInfo,
      RegisterAvator,
      RegisterNavBar
    },
    methods:{
      showLabel(value) {
        if(!value) this.isShowLabel = false
      },
      // 使用query参数会显示在url中，所以刷新之后不会消失;使用params时与query相反，并且
      // 需要在路由以及跳转方式中配置相同的name属性值。此处使用query
      Register() {
        register(this.getUserInfo()).then(res => {
          this.isShowLabel = res.data.flag
          res.data.flag === false ? this.$router.push({
            path:"/login",
            query:{uid:res.data._id}
          }) : ''
        })
      },
      chooseAvator(avatorSrc) {
        this.avatorSrc = avatorSrc
      }
    },
    created() {
      getAvators().then(res => {this.avators = res.data})
    },
   
  }
</script>

<style scoped>
  .logo {
    margin: 40px;
  }
  .user-button {
    margin-top: 30px;
  }
</style>