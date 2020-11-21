import request from './request'
export function getPrivateDialogue (myself) {
  return request({
    url:'/getPrivateDialogue',
    params:{
      myself
    }
  })
}
export function getSpecificDialogue (myself,friend) {
  return request({
    url:'/getSpecificDialogue',
    params:{
      myself,
      friend
    }
  })
}