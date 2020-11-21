import request from "./request"
export default function getRequest (uid) {
  return request({
    url:"/getRequest",
    params:{
      uid,
    }
  })
}