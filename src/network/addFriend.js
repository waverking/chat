import request from "./request"
export default function addFriend (config) {
  return request({
    url:"/addFriend",
    method:"post",
    params:{
      sendUID: config.sendUID,
      targetUID: config.targetUID
    } 
  })
}