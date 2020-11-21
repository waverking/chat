const app = require("express")()
const http = require("http").Server(app)//必须使用http.listen实施监听
const io = require("socket.io")(http)
const cors = require("cors")
const port = 4000

// 跨域设置
const corsOptions = {
  origin:"*",
  optionsSuccessStatus:200
}

// 导入辅助内容
const { getAvators, getChatUser, getRequest, insertUser, insertRequest, 
        isSame, acceptRequest, storePrivateDialogue, getPrivateDialogue,
        launchGroup, getGroupMembers, storeGroupDialogue, getGroupDialogueById,
        getGroupDialogueByName,getSpecificDialogue
      } 
        = require("./mongo")
const { ObjectId } = require("mongodb")

// 存放所有连接用户的socketid和uid(当前用户在数据库中的唯一标识)，登录时执行
let allIds = [{
  sid:'',
  uid:''
}]

// io部分实现
io.on("connection",socket => {
  /**
   * 刷新：socketID改变
   * 页面销毁创建(前进或者后退)：socketID不变
   */
  socket.on("labelMyself",data => {
    // index重复的话，直接替换；否则添加。
    let index = allIds.findIndex(item => item.uid === data.uid)
    index < 0 ? allIds.push(data) : allIds.splice(index,1,data)
  })
  // 添加好友
  socket.on('addFriend',data => {
    myFriend = allIds.find(item => item.uid === data)
    if(myFriend.sid) {
      socket.to(myFriend.sid).emit('receiveRequest')
    }
  })
  // 接受好友请求
  socket.on('acceptRequest',data => {
   ;(async function () {
    const myFriend = allIds.find(item => item.uid === data.friend._id)
    if (myFriend) {
      socket.to(myFriend.sid).emit('giveNotice')
      socket.emit('giveNotice')
    }
   })()
  })
  // 发送私聊信息给好友同时双方显示最新消息
  socket.on('toMyFriend',data => {
    const {myself,friend,content,date} = data,
          target = allIds.find(item => item.uid === friend._id)
    if (target) {
      socket.to(target.sid).emit('receiveMessage',{
        friend:myself,
        content,
        date
      })
      socket.to(target.sid).emit('showNewestMessage',{
        target:myself,
        content
      })
      socket.emit('showNewestMessage',{
        target:friend,
        content
      })
    }
  })
  // 将群聊创建成功的消息发送给所有成员
  socket.on('postSuccessNotice',name => {
    ;(async () => {
        const members = await getGroupMembers(name)
        members.forEach(member => {
          const obj = allIds.find(item => item.uid === member._id)
          if(obj) socket.to(obj.sid).emit('receiveSuccessNotice')
        })
        socket.emit('receiveSuccessNotice')
    })()
  })
  // 将个人内容发送给所有群聊成员
  socket.on('textingMembers',async data => {
    const {name,member,content,date} = data,
          members = await getGroupMembers(name)
    members.forEach(item => {
      const target = allIds.find(element => element.uid === item._id)
      if(target && item.username !== name) {
        socket.to(target.sid).emit('receiveGruopMessage',{member,content,date})
        socket.to(target.sid).emit('showNewestGroupMessage')
      }
      socket.emit('showNewestGroupMessage')
    })
  })
})

// 用户选取头像(注册页面)
app.get("/showAvator", cors(corsOptions), (req, res) => {
  getAvators().then(result => { res.send(result) }) 
})

// 用户注册(注册页面)
app.post("/insertUser",cors(corsOptions),(req,res) => {
  getChatUser({
    username:req.query.username,
    password:req.query.password
  }).then(result1 => {
    // 已经存在该用户或者插入新用户
    result1.length ? res.send({ flag: true }) : insertUser(req.query).then(result2 => {
      res.send({ flag: false, _id: result2.ops[0]._id })
    })
  })
})

// 用户登录(登录页面)
app.post("/getUser",cors(corsOptions),(req,res) => {
  getChatUser(req.query).then(result => {
    // 登录成功或者登录失败
    result.length ? res.send({ flag: true,_id:result[0]._id}) : res.send({ flag: false })
  })
})

// 取出注册以及登陆成功时的用户信息(用户列表界面)
app.get("/getCurrentUser",cors(corsOptions),(req,res) => {
  let uid = {"_id": ObjectId(req.query.uid)}
  getChatUser(uid).then(result => res.send(result))
})

// 在搜索页面取出所有已经注册的用户
/**
    * 在用==比较时,如果类型相同，用===比较结果；
    * 如果不同，则需根据以下规则进行类型转换在比较：
   1）如果一个是null，一个是undefined，那么相等
   2）如果一个是字符串，一个是数值，把字符串转换成数值之后再进行比较
    * 在用===比较时，如果数值类型不同，直接返回false
    * 这里的uid的类型是字符串，_id的类型是对象，所以需要使用==。
    */
app.get("/getAllUsers",cors(corsOptions),(req,res) => {
  getChatUser().then(result => {
    let index = result.findIndex(item => item._id == req.query.uid)
    result.splice(index,1)
    res.send(result)
  })
})

/**
   * 加好友(本质上是发给自己)
   * 在处理发送好友请求数量的时候，需要判断当前的targetUID是否已经存在数据库中，
   * 如果不存在，则将本次提交数据插入数据库中；
   * 如果存在，判断本次请求的sendUID是否已经存在于该实例对象的数组当中,
   * 如果存在，结束本次操作；反之压入数组中。
   * targetUID和sendUID是1:n的数量关系
   * */
app.post("/addFriend",cors(corsOptions),(req,res) => {
  const condition = { targetUID: req.query.targetUID }
  getRequest(condition).then(result => {
    result.length ? isSame(req.query,condition) : insertRequest(req.query)
  })
  res.send("success")
})

// 获取自身的好友申请数量
app.get("/getRequest",cors(corsOptions),(req,res) => {
  const condition = {targetUID:req.query.uid}
  getRequest(condition).then(result => {
    res.send(result)
  })
})

//获取所有请求好友的信息
app.get('/getAllRequestUsers',cors(corsOptions),(req,res) => {
  let allUsers = []
  req.query.sendUIDS.forEach(uid => {
    let id = { "_id": ObjectId(uid) }
    getChatUser(id).then(result => {
      allUsers.push(result[0])
    })
  })
  setTimeout(() => {
    res.send(allUsers)
  }, 100);
}) 

/**
 * 添加好友
 * 1.将好友以及自己的信息记录在friend集合里
 * 2.删除request集合里本条申请记录
 */ 
app.post('/acceptRequest',cors(corsOptions),(req,res) => {
  acceptRequest(req.query).then(result => {
    res.send(result)
  })
})

// 获取与某一个用户的私人聊天记录
app.get('/getSpecificDialogue',cors(corsOptions),(req,res) => {
  getSpecificDialogue(req.query).then(result => {
    res.send(result)
  })
})

// 保存私人聊天记录
app.post('/storePrivateDialogue',cors(corsOptions),(req,res) => {
  storePrivateDialogue(req.query).then(result => {
    res.send(result)
  })
})

// 获取所有私人聊天记录->用于uerlist界面
app.get('/getPrivateDialogue',cors(corsOptions),(req,res) => {
  getPrivateDialogue(req.query).then(result => {
    res.send(result)
  })
})

// 发起群聊
app.post('/launchGroup',cors(corsOptions),(req,res) => {
  launchGroup(req.query).then(result => {
    res.send(result)
  })
})

// 保存群聊信息
app.post('/storeGroupDialogue',cors(corsOptions),(req,res) => {
  storeGroupDialogue(req.query).then(result => {
    res.send(result)
  })
})

// 通过uid获取自身加入的群聊信息->用于userlist界面
app.get('/getGroupDialogueById',cors(corsOptions),(req,res) => {
  getGroupDialogueById(req.query.uid).then(result => {
    res.send(result)
  })
})

// 通过name获取群聊信息->用于具体的某一个群聊
app.get('/getGroupDialogueByName',cors(corsOptions),(req,res) => {
  getGroupDialogueByName(req.query.name).then(result => {
    res.send(result)
  })
})

// 建立服务器
http.listen(port,() => {
  console.log("activated");
})
