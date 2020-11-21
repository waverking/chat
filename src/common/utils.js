import { myMessage, frinedMessage } from './css'

// 注册登录页面获取用户填写信息
export const getUserInfo = {
  methods:{
    getUserInfo() {
      const user = this.$refs.user
      let username = user.$refs.username.value
      let password = user.$refs.password.value
      if(this.avatorSrc) {
        let avator = this.avatorSrc
        let userInfo = { username, password, avator }
        return userInfo
      }
      let userInfo = {username,password}
      return userInfo
    }
  }
}
// 跳转到搜索好友界面
export const toSearch = {
  methods:{
    toSearch() {
      this.$router.push({
        path: "/searchlist",
        query: { uid: this.$route.query.uid }
      })
    }
  }
}
// 刷新之后保存最新的sid
export const labelMyself = {
  created () {
    let content = {
      sid: this.$socket.id,
      uid: this.$route.query.uid
    }
    this.$socket.emit("labelMyself", content)
  } 
}
// 防抖函数，减少频繁的操作
export function debounce (func,delay) {
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    }, delay);
  }
}
// 聊天页面渲染我的信息
export function showMyMessage (obj,value,that,date = '') {
  const test = new DOMParser().parseFromString(
    `<div name='test'>
      <div style=${myMessage.TIME}>${date}</div>
      <div style=${myMessage.M_CONTAINER}>
       <div style=${myMessage.M_CONTENT}>
         ${value}
         <div style=${myMessage.TAIL}></div>
       </div>
       <div><image src='${obj.avator}' style=${myMessage.AVATOR}/></div>
      </div>
    </div>`, 'text/html').getElementsByName('test')[0]
  that.$refs.scroll.$refs.chat.appendChild(test)
}
// 聊天页面渲染对方的信息
export function showFriendMessage(obj,value,that,date = '') {
  const test = new DOMParser().parseFromString(
    `<div name='test'> 
      <div style=${frinedMessage.TIME}>${date}</div>
      <div style=${frinedMessage.F_CONTAINER}>
        <div><image src='${obj.avator}' style=${frinedMessage.AVATOR}/></div>
        <div style=${frinedMessage.F_CONTENT}>
          ${value}
          <div style=${frinedMessage.F_TAIL}></div>
        </div>
      </div>
    </div>`, 'text/html').getElementsByName('test')[0]
  that.$refs.scroll.$refs.chat.appendChild(test)
}
// 发消息或者当接受对方消息并距离底部一定距离时，直接定位到新发的消息的位置
export const toBottom = {
  methods:{
    toBottom () {
      const y = Array.from(this.$refs.scroll.$refs.chat.childNodes).pop().offsetTop
      this.$refs.scroll.scrollTo(-y)
      this.$refs.scroll.refresh()
    }
  }
}
// 创建群聊类，用于初始化群聊信息->
export class Group {
  constructor (data) {
    this.name = 'Group'
    this.groupName = data.name
    this.users = data.users
    this.dialogue = data.dialogue
    this.title = this.groupName + `(${this.users.length})`
  }
}
/**
  记录时间差，以每5分钟为一个跨度显示时间；年月日时分
*/
export class TimePiece {
  constructor () {
    this.name = 'TimePiece'
  }
  // 记录时间片段
  recordTimePiece () {
    const preDate = localStorage.getItem('preDate')
    if (!preDate) {
      localStorage.setItem('preDate', this.createTimePiece())
      return true
    } else {
      const currDate = this.createTimePiece(),
            dateTarget = this.sliceTimePiece(preDate,currDate)
      return this.ifSetNewTimePiece(dateTarget)
    }
  }
  // 创建时间片段
  createTimePiece () {
    const date = new Date().toLocaleString('chinese', { hour12: false }),
          formatted_date = date.replace(/\:\d{2}$/g, '')
    return formatted_date
  }
  // 截取时间片段
  sliceTimePiece () {
    let temp = [],
        timeData = Array.from(arguments) 
    timeData.forEach(item => {
      let obj = {
            date : item.slice(0, 10),
            hour : item.slice(-5,-3),
            minute: item.slice(-2)
          }
      temp.push(obj)
    })
    return temp
  }
  // 决定是否设置新的时间片段
  ifSetNewTimePiece (target) {
    const [pre,curr] = target
    if (pre.date !== curr.date || pre.hour !== curr.hour || curr.minute - pre.minute > 5) {
      localStorage.setItem('preDate', this.createTimePiece())
      return true
    }
    return false
  }
}

//私聊和群聊页面监听页面高度的变换
export const watchHeight = {
  data () {
    return {
      f_height:document.documentElement.clientHeight,
      l_height:document.documentElement.clientHeight
    }
  },
  watch: {
    l_height () {
      this.f_height > this.l_height ? this.toBottom() : (() => {return})()
    }
  },
  mounted () {
    window.onresize = () => {
      this.l_height = document.documentElement.clientHeight
    }
  }
}