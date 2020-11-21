<template>
  <div v-if="test">
    <nav-bar v-for="(item,index) in allUsers" :key="index" class="main-box">
      <div slot="left" class="left">
        <div class="avator"><img :src="item.avator"></div>
      </div>
      <div slot="center" class="center">
        <span>{{item.username}}</span>
      </div>
      <div slot="right" class="right" @click="addFriend(index)" 
          ref="friend" >加好友</div>
      <div slot="right" class="right message" @click="toPrivateChat(index)" 
          ref="message" hidden>发消息</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import addFriend from 'network/addFriend'
  export default {
    name:'UserList',
    components:{
      NavBar
    },
    data () {
      return {
        test:true,
        temp:[]
      }
    },
    props:{
      allUsers:{
        type:Array,
        default () {
          return []
        }
      },
    },
    watch:{
      allUsers: {
        handler() {
          this.test = false
          this.$nextTick(() => {
            this.test = true
          })
        },
        deep:true
      }
    },
    methods:{
      addFriend (index) {
        this.$toast.showMessage('已发送')
        const config = {
                sendUID:this.$route.query.uid,
                targetUID:this.allUsers[index]._id
              },
              pos = this.temp.findIndex(item => item.targetUID === config.targetUID)
        if(pos > -1) {
          return
        }else {
          addFriend(config).then(res => {
            this.$socket.emit('addFriend',this.allUsers[index]._id)
          })
          this.temp.push(config)
        }
      },
      //从任意一个私聊页面退出都会导致ls被清除，所以需要重新设置
      toPrivateChat (index) {
        localStorage.setItem(this.$route.query.uid,
                             JSON.stringify(this.allUsers[index]))
        this.$router.push({
          path:'/privatechat',
          query:{
            uid:this.$route.query.uid
          }
        })
      }
    }
  }
</script>

<style scoped src='assets/css/user-info.css'>

