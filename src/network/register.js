import request from "./request"

export function register(data) {
  return request({
    url:"/insertUser",
    method:"post",
    params:{
      username: data.username,
      password: data.password,
      avator:data.avator,
      socketID:data.socketID
    }
  })
}

export function getAvators() {
  return request({
    url:"/showAvator"
  })
}