import request from "./request"
export function getCurrentUser(uid) {
  return request({
    url:"/getCurrentUser",
    params:{uid}
  })
}
// searchlist页面
export function getAllUsers(uid) {
  return request({
    url:"/getAllUsers",
    params:{uid}
  })
}
