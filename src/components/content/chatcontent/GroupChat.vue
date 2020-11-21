<template>
  <div ref="box">
    <nav-bar class="content" v-for="(item,index) in content" :key="index" 
             @click.native="toGroupChat(index)">
      <div slot="left" class="left">
        <img :src="childItem.avator" alt="" v-for="(childItem,index) in item.users" 
             :key="index">
      </div>
      <div slot="center" class="center">
        <span class="name">{{item.name}}</span>
        <span class="last" ref="last">{{item | lastContent}}</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  // import createRoom from 'network/createRoom'
  import LogoVue from '../../common/logo/Logo.vue'
  export default {
    name:'PrivateChat',
    props:{
      content:{
        type:Array,
        default () {
          return []
        }
      }
    },
    filters:{
      lastContent (item) {
        if(item.dialogue.length) {
          const[lastOne] = item.dialogue.slice(-1)
          return lastOne.content
        }
        return `你已经加入到群聊${item.name}中`
      }
    },
    components:{
      NavBar
    },
    methods:{
      toGroupChat (index) {
        this.$router.push({
          path:'/groupchat',
          query:{
            uid:this.$route.query.uid,
            name:this.content[index].name
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
     display: flex;
     flex-wrap: wrap;
     width:36px;
     height: 36px;
     overflow: hidden;
     border-radius: 6px;
     background-color: rgba(0,0,0,.1);
   }
   .left>img {
     width: 50%;
     height:50%;
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

