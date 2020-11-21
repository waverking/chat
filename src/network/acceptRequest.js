import request from './request'
export default function acceptRequest (config) {
  return request(({
    url:'/acceptRequest',
    method:'post',
    params:{
      myself: config.myself,
      friend: config.friend
    }
  }))
}