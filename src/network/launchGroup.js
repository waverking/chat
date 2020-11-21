import request from './request'
export default function launchGroup (name,users) {
  return request({
    url:'/launchGroup',
    method:'post',
    params:{
      name,
      users
    }
  })
}