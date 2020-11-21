<template>
  <div>
    <nav-bar v-for="(item,index) in myRequests" :key="index" class="main-box" >
      <div slot="left" class="left">
        <div class="avator"><img :src="item.avator"></div>
        <span class="username">{{item.username}}</span>
      </div>
      <div slot="right" class="right" @click.once="acceptRequest(index)"
           ref="status">{{status}}</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import acceptRequest from 'network/acceptRequest'
  import {getCurrentUser} from 'network/userlist'
  export default {
    name:'RequestBox',
    components:{
      NavBar
    },
    data () {
      return {
        myself:{},
        status:'接受',
      }
    },
    props:{
      myRequests:{
        type:Array,
        default () {
          return []
        }
      }
    },
    methods:{
      acceptRequest (index) {
        const data = {
          myself:this.myself,
          friend:this.myRequests[index]
        }
        acceptRequest(data).then(res => {
          this.$socket.emit('acceptRequest',data)
        })
        this.$refs.status[index].innerText = '已添加'
      }
    },
    created () {
      getCurrentUser(this.$route.query.uid).then(res => {
        this.myself = res.data[0]
      })
    }
  }
</script>

<style scoped src='assets/css/user-info.css'>
 
