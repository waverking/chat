const { getDB, getCollection, getData, insertData, doNothing} = require("./utils")

// 初始化数据库chatUser
let chatUser = null

// 连接数据库chatUser(连接一次即可)
getDB("chatUser").then(res => {
  chatUser = res
})

// 从avator集合获取头像
async function getAvators () {
  try {
    const avator = getCollection(chatUser,"avator"),
          result = await getData(avator)
    return result
  } catch (error) {
    console.log(error)
  }
}

// 从user集合获取用户信息
async function getChatUser (config) {
  try {
    const user = getCollection(chatUser,"user"),
          result = await getData(user, config)
    return result
  } catch (error) {
    console.log(error)
  }
}

// 往user集合插入新用户
async function insertUser (data) {
  try {
    const user = getCollection(chatUser,"user"),
          result = await insertData(user, data)
    return result
  } catch (error) {
    console.log(error);
  }
}

// 往request集合插入用户请求信息
async function insertRequest (data) {
  try {
    const obj = {
      targetUID:data.targetUID,
      sendUIDS:[data.sendUID]
    },
          request = getCollection(chatUser,"request"),
          result = await insertData(request,obj)
    return result
  } catch (error) {
    console.log(error);
  }
}

//从request集合获取用户请求信息
async function getRequest (config) {
  try {
    const request = getCollection(chatUser,"request"),
          result = await getData(request, config)
    return result
  } catch (error) {
    console.log(error)
  }
}

// 更新request集合
function updateRequest (query,target,condition) {
  try {
    const request = getCollection(chatUser,"request"),
          new_array = [...target,query.sendUID]
    request.updateOne(condition,{$set:{sendUIDS:new_array}})
  } catch (error) {
    console.log(error);
  }
}
 
// 判断request集合的文档是否存在相同的sendUID
function isSame(query,condition) {
  getRequest(condition).then(res => {
    const target = res[0].sendUIDS,
          index = target.findIndex(item => item === query.sendUID)
    index === -1 ? updateRequest(query,target,condition) : doNothing()
  })
}

// 删除请求
async function deleteRequest(myself,friend) {
  const request = getCollection(chatUser, 'request'),
        condition = { targetUID: myself._id},
        result = await getRequest(condition),
        [array] = result,
        index = array.sendUIDS.findIndex(item => item === friend._id)
  array.sendUIDS.splice(index, 1)
  if (array.sendUIDS.length === 0 ) {
      return request.deleteOne(condition)
  }else {
    const target = {
      sendUIDS: array
    }
    return request.updateOne(condition, { $set: target })
  }   
}

// 插入好友
async function insertFriend (user_one,user_two) {
  try {
    const target = {
            myself: user_one,
            friend: user_two,
            dialogue: []
          },
          private = getCollection(chatUser, 'private'),
          result = await insertData(private, target)
    return result
  } catch (error) {
    console.log(error);
  }
}

//执行接受好友的操作
async function acceptRequest (data) {
  const myself = JSON.parse(data.myself),
        friend = JSON.parse(data.friend),
        result_one = insertFriend(myself,friend), 
        result_two = insertFriend(friend,myself)
  if(result_one && result_two) {
    return deleteRequest(myself,friend)
  }
}

// 获取私人聊天记录
async function getPrivateDialogue (data) {
  try {
    const myself = JSON.parse(data.myself),
          private = getCollection(chatUser, 'private'),
          result = await getData(private, {myself})
    return result
  } catch (error) {
    console.log(error);
  }
}

// 保存私人聊天记录->数据是相同的，所以只需要拿到其中一个的对话记录进行更新就可以
async function storePrivateDialogue (data) {
  try {
    const content = data.content,
          myself = JSON.parse(data.myself),
          friend = JSON.parse(data.friend)
          myCondition = {
            myself,
            friend
          },
          friendCondition = {
            myself: friend,
            friend: myself
          },
          insertedData = {
            user:myself,
            content,
            date:data.date
          },
          private = getCollection(chatUser, 'private'),
          myResult = await getData(private, myCondition),
          target = [...myResult[0].dialogue, insertedData],
          result_one = private.updateOne(myCondition, {$set: {dialogue:target}})
          result_two = private.updateOne(friendCondition, {$set: {dialogue:target}})
    return result_one && result_two
  } catch (error) {
    console.log(error);
  }
}

// 发起群聊
async function launchGroup (data) {
  try {
    const group = await getCollection(chatUser,'group'),
          result = await insertData(group,{
            name:data.name,
            users:data.users.map(user => JSON.parse(user)),
            dialogue:[]
          })
    return result
  } catch (error) {
    console.log(error);
  }
}

// 获取群聊成员
async function getGroupMembers (name) {
  try {
    const group = getCollection(chatUser,'group'),
          members = await getData(group,{name})
    return members[0].users
  } catch (error) {
    console.log(error);
  }
}

// 保存群聊内容
async function storeGroupDialogue (data) {
  try {
    const group = getCollection(chatUser,'group'),
          condition = {name:data.name},
          target = await getData(group,condition),
          obj = [ ...target[0].dialogue,
                  {
                    user: JSON.parse(data.user),
                    content:data.content,
                    date:data.date
                  }
                ],
          result = group.updateOne(condition,{$set:{dialogue:obj}})   
    return result
  } catch (error) {
    console.log(error);
  }
}
// 通过uid获取群聊内容
async function getGroupDialogueById (uid) {
  try {
    const collection_group = getCollection(chatUser,'group'),
          allGroups = await getData(collection_group),
          targetGroups = allGroups.filter(item => {
            const result = item.users.filter(user => user._id === uid)
            if(result.length) {
              return true
            }
            return false  
          })
    return targetGroups
  } catch (error) {
    console.log(error);
  }
}
//通过name获取群聊信息
async function getGroupDialogueByName (name) {
  try {
    const group = getCollection(chatUser,'group'),
          result = await getData(group,{name})
    return result
  } catch (error) {
    console.log(error);
  }
} 

// 获取与特定好友的聊天记录
async function getSpecificDialogue (data) {
  try {
    const myself = JSON.parse(data.myself),
          friend = JSON.parse(data.friend),
          private = getCollection(chatUser,'private'),
          dialogue = await getData(private,{myself,friend})
    return dialogue
  } catch (error) {
    
  }
}
module.exports = {
  getAvators,
  getChatUser,
  getRequest,
  insertUser,
  insertRequest,
  updateRequest,
  isSame,
  acceptRequest,
  storePrivateDialogue,
  getPrivateDialogue,
  launchGroup,
  getGroupMembers,
  storeGroupDialogue,
  getGroupDialogueById,
  getGroupDialogueByName,
  getSpecificDialogue
}