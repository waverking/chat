<template>
  <div id="user-list">
    <list-nav-bar :myAvator="currentUser.avator" class="list-nav-bar"/>
    <scroll class="content">
      <search-friend @toSearch="toSearch" v-if="isSearch"/> 
      <add-friend :count="count" @click.native="toHandleRequest" v-if="isAdd"/>
      <private-chat :content='allMyFriends' ref="content"/>
      <group-chat :content='allGroupDialogues'/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import PrivateChat from 'components/content/chatcontent/PrivateChat'
  import GroupChat from 'components/content/chatcontent/GroupChat'
  import ListNavBar from "./childComps/ListNavBar"
  import SearchFriend from "./childComps/SearchFriend"
  import AddFriend from "./childComps/AddFriend"

  import {getCurrentUser} from "network/userlist"
  import getRequest from "network/getRequest"
  import {getGroupDialogueById} from 'network/getGroupDialogue'
  import {getPrivateDialogue} from 'network/getPrivateDialogue'
  import { toSearch, labelMyself } from "common/utils"
  export default {
    name:"UserList",
    data() {
      return {
        currentUser:{},
        isSearch:true,
        isAdd:false,
        // isContent:false,
        count:0,
        allMyFriends:[],
        allGroupDialogues:[]
      }
    },
    mixins:[toSearch,labelMyself],
    components:{
      Scroll,
      ListNavBar,
      SearchFriend,
      AddFriend,
      PrivateChat,
      GroupChat
    },
    methods:{
      /**
       * 初始化当前用户好友和群聊信息
       *  需要对获取好友和私聊信息记录的方法进行改进->数据库直接保存好友所有信息
       * 以及聊天记录
      **/ 
      async init () {
        const myself = this.$route.query.uid, 
              currentUser = await getCurrentUser(myself),
              requests = await getRequest(myself),
              friends = await getPrivateDialogue(currentUser.data[0])
        this.allMyFriends = friends.data
        this.currentUser = currentUser.data[0]
        this.getGroupDialogueById(myself)
        this.ifShow(friends,requests)
      },
      // 获取加入的所有群聊
      async getGroupDialogueById (myself) {
        const allGroupDialogues = await getGroupDialogueById(myself)
        this.allGroupDialogues = allGroupDialogues.data
      },
      // 决定是否显示搜索好友图标以及好友请求处理图标
      ifShow (friends,requests) {
        friends.data.length || requests.data.length ?  this.isSearch = false:
                                                       this.isSearch = true
        if(requests.data.length) {
          this.count = requests.data.length
          this.isAdd = true
        }
      },
      // 跳转到好友请求处理界面
      toHandleRequest () {
        this.$router.push({
          path:'/handlerequest',
          query:{
            uid:this.$route.query.uid,
          }
        })
      }
    },
    sockets:{
      // 接受好友请求
      receiveRequest () {
        this.count += 1
        this.isAdd = true
        this.isSearch = false
      },
      // 好友请求成功后通知->重新初始化
      giveNotice () {
        this.count -= 1
        this.isSearch = false
        if(this.count === 0) {
          this.isAdd = false
        }
        this.init() 
      },
      // 实时显示私聊最新的消息
      showNewestMessage (data) {
        const index = this.allMyFriends.findIndex(item => item.friend._id === data.target._id)
        this.$refs.content.$refs.last[index].innerText = data.content
      },
      // 接收到群聊创建成功通知
      receiveSuccessNotice () {
        this.getGroupDialogueById(this.$route.query.uid)
      },
      // 显示群聊最新消息
      showNewestGroupMessage () {
        this.getGroupDialogueById(this.$route.query.uid)
      }
    },
    created () {
      this.init()
    },
  }
</script>

<style scoped>
  #user-list {
    height: 100vh;
  }
  .content {
    height: calc(100% - 44);
    overflow: hidden;
  }
  .list-nav-bar {
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  }
</style>