<template>
  <div ref="box">
    <nav-bar class="content" v-for="(item,index) in content" :key="index" 
             @click.native="toPrivateChat(index)">
      <div slot="left" class="left">
        <img :src="item.friend.avator" alt="">
      </div>
      <div slot="center" class="center">
        <span class="name">{{item.friend.username}}</span>
        <span class="last" ref="last">{{item.dialogue | showLast}}</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name:'PrivateChat',
    props:{
      content:{
        type:Array,
        default () {
          return []
        }
      },
    },
    components:{
      NavBar
    },
    filters: {
      showLast (dialogue) {
       if(dialogue.length) {
         const [last] = dialogue.slice(-1)
         return last.content
       }
       return '我们已经是好友了，可以开始聊天了'
      }
    },
    methods:{
      toPrivateChat (index) {
        localStorage.setItem(this.$route.query.uid,JSON.stringify(this.content[index].friend))
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

<style scoped>
  .content{
     margin-top: 20px;
     padding: 14px;
   }
   .left {
     width:36px;
     height: 36px;
     overflow: hidden;
     border-radius: 6px;
     background-color: rgba(0,0,0,.1);
   }
   .left>img {
     width: 100%;
     height: 100%;
   }
  .left,.center {
    text-align: start;
  }
  .center {
    width: calc(100vw - 50px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 10px;
    box-shadow: 0 -1px rgba(0, 0, 0, .2) inset;
  }
  .center span {
    height: 22px;
    line-height: 22px; 
  }
  .last {
    color: rgba(0, 0, 0, .4);
    font-size: 14px;
  }
</style>

