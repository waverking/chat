import request from "./request"
export function Login(data) {
  return request({
    url:"/getUser",
    method:"post",
    params:{
      username:data.username,
      password:data.password
    }
  })
}