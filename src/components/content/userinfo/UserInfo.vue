<template>
  <div id="userInfo">
    <div class="title">{{title}}</div>
    <div class="username-box">
      <input type="text" class="username" placeholder="请输入名称" 
             ref="username" maxlength="16" @input="inputUsername">
      <label for="" v-if="isShowLabel">已存在该用户</label>
      <img src="~assets/img/common/turn-off.svg" alt="" v-if="isShowOff"
           @click="deleteUsername">
    </div>
    <div class="password-box">
      <input type="password" class="password" placeholder="请输入密码" ref="password"
             @input="inputPassword" maxlength="16">
      <img src="~assets/img/common/eye-closed.svg" alt="" v-if="isShowClosed"
           @click="showPassword">
      <img src="~assets/img/common/eye-opened.png" alt="" v-if="isShowOpened"
           @click="hidePassword" class="opened">
    </div>
  </div>
</template>

<script>
  export default {
    name:"UserInfo",
    data() {
      return {
        
      }
    },
    props:{
      title:{
        type:String,
        default() {
          return ''
        }
      },
      isShowLabel:{
        type:Boolean,
        default() {
          return false
        }
      }

    },
    data() {
      return {
        isShowOff:false,
        isShowClosed:false,
        isShowOpened:false
      }
    },
    methods:{
      inputUsername() {
        this.$refs.username.value ? this.isShowOff = true : this.isShowOff = false
        this.$emit("showLabel",this.$refs.username.value)
      },
      deleteUsername() {
        this.$refs.username.value = ''
        this.isShowOff = false
      },
      inputPassword() {
        this.$refs.password.value ? this.isShowClosed = true : this.isShowClosed = false
        if(!this.$refs.password.value) this.isShowOpened = false
      },
      showPassword() {
        this.$refs.password.type = 'text'
        this.isShowOpened = true
      },
      hidePassword() {
        this.$refs.password.type = 'password'
        this.isShowOpened = false
      }
    }
  }
</script>

<style scoped>
  #userInfo {
    width: 80%;
    margin: 0 auto;
  }
  #userInfo  div {
    margin-top: 60px;
  }
  .title {
    font-family: PingFangSC-Medium;
    color: #272832;
    font-size: 30px;
  }
  .username,.password {
    width: 100%;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid rgba(0, 0, 0, .5);
    outline: none;
    padding-bottom: 10px;
    color: rgba(39,40,50,.6);
    font-size: 18px;
  }
  .username-box,.password-box {
    position: relative;
  }
  .username-box label{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
    color: #FF5D5B;
  }
  .username-box img,.password-box img {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
  }
  .opened {
    z-index: 9;
    background-color: #fff;
  }
</style>