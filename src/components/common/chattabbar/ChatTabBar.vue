<template>
  <nav-bar class="tabbar">
    <div slot="left" class="left">
      <img src="~assets/img/common/voice.png" alt="">
    </div>
    <div slot="center" class="center" ref="center">
      <input type="text" @input="showButton" ref="myContent">
    </div>
    <div slot="right" class="right">
      <img src="~assets/img/common/expression.png" alt="">
      <img src="~assets/img/common/add-group.png" alt="" v-if="isShow">
      <button v-else class="send-button" @click="sendMessage">发送</button>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from '../navbar/NavBar'
  import { debounce } from 'common/utils'
  export default {
    name:'CharTabBar',
    data () {
      return {
       isShow:true ,
       myContent:'',
       debounce_func:''
      }
    },
    components:{
      NavBar
    },
    mounted () {
      this.debounce_func = debounce(() => {
        const myContent = this.$refs.myContent.value
        const space = new RegExp(/^[ ]+$/)
        if(space.test(myContent) || myContent === '') {
          this.isShow = true
          return
        }
        this.myContent = myContent
        this.isShow = false
      },100)
    },
    methods:{
      showButton () {
        this.debounce_func()
      },
      sendMessage () {
        this.$emit('sendPrivateMessage',this.myContent)
        this.$emit('sendGroupMessage',this.myContent)
        this.$refs.myContent.value = ''
        this.isShow = true
      } 
    }
  }
</script>

<style scoped>
  .tabbar {
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgba(223, 230, 233, .4);
  }
  .tabbar img {
    vertical-align: middle;
    width: 28px;
    height: 28px;
  }
  .left {
    width: 40px;
  }
  .center {
    width: 236px;
    height: 44px;
    margin-left:-38px;
  }
  .center input {
    width: 100%;
    height: 70%;
    border-radius: 6px;
    outline: none;
    border: none;
  }
  .right {
    width: 100px;
    display: flex;
    justify-content: start;
    margin-left: -10px
  }
  .right>img:nth-child(2) {
    margin-left: 20px;
  }
  .send-button {
    width: 50px;
    outline: none;
    border: none;
    color: rgba(236, 240, 241,1.0);
    background-color: rgba(46, 204, 113,1.0);
    border-radius: 10%;
    margin-left: 4px;
  }
</style>