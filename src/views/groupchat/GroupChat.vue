<template>
  <div class="chat-box">
    <chat-nav-bar :Name='title'/>
    <chat-tab-bar @sendGroupMessage='sendGroupMessage'/>
    <scroll class="scroll" ref="scroll" @recordPositon='recordPositon'/>
  </div>
</template>

<script>
  import ChatNavBar from 'components/common/chatnavbar/ChatNavBar'
  import ChatTabBar from 'components/common/chattabbar/ChatTabBar'
  import Scroll from 'components/common/scroll/Scroll'

  import {labelMyself,showMyMessage,showFriendMessage,toBottom,
          debounce,TimePiece,Group,watchHeight} from 'common/utils'

  import {getCurrentUser} from 'network/userlist'
  import {getGroupDialogueByName} from 'network/getGroupDialogue'
  import storeGroupDialogue from 'network/storeGroupDialogue'
  export default {
    name:'GroupChat',
    data () {
      return {
        myself:{},
        groupName:'',
        title:'',
        debouncePosition:'',
        currPosition:0
      }
    },
    components:{
      ChatNavBar,
      ChatTabBar,
      Scroll
    },
    mixins:[labelMyself,toBottom,watchHeight],
    //接受到来自群聊成员的信息
    sockets:{
      receiveGruopMessage (data) {
        showFriendMessage(data.member,data.content,this,data.date)
        const offsetTop = Array.from(this.$refs.scroll.$refs.chat.childNodes).pop().offsetTop
          if(offsetTop - this.currPosition < 600) {
            this.toBottom()
          } 
      }
    },
    methods: {
      // 初始化页面数据->获取自身信息以及群聊信息
      async init () {
        const myself = await getCurrentUser(this.$route.query.uid),
              originalGroup = await getGroupDialogueByName(this.$route.query.name),
              group = new Group(...originalGroup.data)
        this.myself = myself.data[0]
        this.groupName = group.groupName
        this.title = group.title
        this.renderGroupDialogue(group.dialogue)
      },
      renderGroupDialogue (dialogue) {
        if(dialogue.length) {
          dialogue.forEach(item => {
            if(item.user.username === this.myself.username) {
              showMyMessage(this.myself,item.content,this,item.date)
            } else {
              showFriendMessage(item.user,item.content,this,item.date)
            }                  
          })
        this.toBottom()
        }
      },
      // 将storeGroupDialogue封装
      storeGroupDialogue (groupName,myself,value,date = '') {
        storeGroupDialogue(...arguments).then(res => {
          this.$socket.emit('textingMembers',{
            name:this.$route.query.name,
            member:this.myself,
            content:value,
            date
          })
        })
      },
      /**
       * 发送群聊信息->展示我的信息->提交至数据库保存->通知群聊成员
       */
      sendGroupMessage (value) {
        // flag为true的话，表示需要插入时间信息
        const flag = new TimePiece().recordTimePiece()
        if(flag) {
          const date = localStorage.getItem('preDate')
          showMyMessage(this.myself,value,this,date)
          this.storeGroupDialogue(this.groupName,this.myself,value,date)
        }else {
          showMyMessage(this.myself,value,this)
          this.storeGroupDialogue(this.groupName,this.myself,value)
        }
        this.toBottom()
      },
      // 记录滚动位置
      recordPositon (position) {
        this.debouncePosition(position)
      },
      
    },
    // 获取用户信息以及群聊信息
    created () {
      this.init()
    },
    // 获取滚动位置
    mounted () {
      this.debouncePosition = debounce(position => {
        this.currPosition = -position.y
      },100)
    },
  }
</script>

<style scoped>
  .chat-box {
    height: 100vh;
    background-color: rgba(223, 230, 233, .4);
  }
  .scroll {
    position: relative;
    height:calc(100% - 88px) ;
    overflow: hidden;
  }
</style>