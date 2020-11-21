<template >
  <div class="chat-box">
    <chat-nav-bar :Name='friend.username'/>
    <chat-tab-bar @sendPrivateMessage='sendPrivateMessage'/>
    <scroll class="scroll" ref="scroll" @recordPositon='recordPositon'/>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import ChatNavBar from 'components/common/chatnavbar/ChatNavBar'
  import ChatTabBar from 'components/common/chattabbar/ChatTabBar'

  import {labelMyself,showMyMessage,showFriendMessage,toBottom,
          debounce,TimePiece,watchHeight} from 'common/utils'

  import {getCurrentUser} from 'network/userlist'
  import {getSpecificDialogue} from 'network/getPrivateDialogue'
  import storePrivateDialogue from 'network/storePrivateDialogue'
  export default {
    name:'PrivateChat',
    components:{
      ChatNavBar,
      ChatTabBar,
      Scroll,
    },
    data () {
      return {
        myself:{},
        friend:{},
        debouncePosition:'',
        currPosition:0
      }
    },
    sockets:{
      /**
       * 接受来自好友的消息->如果在本界面有多个好友发送消息,会一起显示，
       * 所以需要判断发送方是不是当前聊天好友->如果是的话，正常执行函数，
       * 否则退出。
       *  */ 
      receiveMessage (data) {
        if(data.friend.username === this.friend.username) {
          showFriendMessage(data.friend,data.content,this,data.date)
          const offsetTop = Array.from(this.$refs.scroll.$refs.chat.childNodes).pop().offsetTop
          if(offsetTop - this.currPosition < 600) {
            this.toBottom()
          } 
        }
      }
    },
    mixins:[labelMyself,toBottom,watchHeight],
    methods:{
      // 初始化->获取个人以及与该朋友的聊天信息
      async init () {
        const myself = await getCurrentUser(this.$route.query.uid)
        this.myself = myself.data[0]
        this.friend = JSON.parse(localStorage.getItem(this.$route.query.uid))
        const result = await getSpecificDialogue(this.myself,this.friend)
        this.renderDialogue(result.data[0].dialogue)
      },
      // 记录位置信息
      recordPositon (position) {
        this.debouncePosition(position)
      },
      // 将私聊信息保存到数据库，之后渲染页面以及通知好友
      storePrivateDialogue (myself,friend,content,date = '') {
        storePrivateDialogue(...arguments).then(res => {
          showMyMessage(this.myself,content,this,date)
          this.toBottom()
          this.$socket.emit('toMyFriend',{
            myself,
            friend,
            content,
            date
          })
        })
      },
      // 点击发送信息并判断是否加入时间
      sendPrivateMessage (value) {
        const flag = new TimePiece().recordTimePiece()
        if(flag) {
          const date = localStorage.getItem('preDate')
          this.storePrivateDialogue(this.myself,this.friend,value,date)
        }else {
          this.storePrivateDialogue(this.myself,this.friend,value)
        }
      },
      renderDialogue (dialogue) {
        if(!dialogue.length) return
        dialogue.forEach(item => {
          if(item.user._id === this.myself._id) {
            showMyMessage(this.myself,item.content,this,item.date)
          }else {
            showFriendMessage(item.user,item.content,this,item.date)
          }
        })
        this.toBottom()
      }
    },
    mounted () {
      this.debouncePosition = debounce(position => {
        this.currPosition = -position.y
      },100)
    },
    created () {
      this.init()
    },
    destroyed () {
      localStorage.removeItem(this.$route.query.uid)
    }
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