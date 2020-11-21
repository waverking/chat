<template>
  <div class="box">
    <button @click='confirm' v-if="isShow">创建({{this.users.length}})</button>
  </div>
</template>

<script>
  import launchGroup from 'network/launchGroup'
  import {getCurrentUser} from 'network/userlist'
  export default {
    name:'Confirm',
    data () {
     return {
       myself:{},
       users:[],
       groupName:'',
       isShow:true,
       f_Height:document.documentElement.clientHeight,//改变前的页面高度
       l_Height:document.documentElement.clientHeight //改变后的页面高度
     }
    },
    watch:{
      // 通过监听页面高度的变换来控制“创建”的显示与否
      l_Height () {
        this.f_Height > this.l_Height ?  this.isShow = false :this.isShow = true
      }
    },
    created () {
      getCurrentUser(this.$route.query.uid).then(res => {
        this.myself = res.data[0]
      })
    },
    mounted () {
      // 当移动端软键盘被唤起时页面高度会变换，将最新的高度保存起来之后做对比
      window.onresize = () => {
        this.l_Height = document.documentElement.clientHeight
      }
      this.$bus.$on('selectUsers',data => {
        this.users = data
      })
      this.$bus.$on('inputName',data => {
        this.groupName = data
      })
    },
    methods:{
      confirm () {
        if(!this.users.length && this.groupName === '') {
          return this.$toast.showMessage('无法创建群聊',1500)
        }else if(this.groupName === '') {
          return this.$toast.showMessage('未输入群聊名称',1500)
        }else if(!this.users.length) {
          return this.$toast.showMessage('未勾选用户',1500) 
        }
        this.launchGroup(this.groupName,[this.myself,...this.users])
      },
      launchGroup (name,users) {
        launchGroup(...arguments).then(res => {
          this.$router.replace({
            path:'/groupchat',
            query:{
              uid:this.$route.query.uid,
              name
            }
          })
          this.$socket.emit('postSuccessNotice',name)
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    position: absolute;
    bottom: 0;
    left: 0;
    width:100vw;
    padding: 16px 0;
    border-top: 1px solid rgba(0, 0, 0, .2);
  }
  button {
    display: block;
    margin: 0 auto;
    width: 94%;
    height: 40px;
    color: #272832;
    background-color: #FFE431 ;
    outline: none;
    border: none;
    border-radius: 6px;
  }
</style>