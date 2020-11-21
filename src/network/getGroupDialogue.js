import request from './request'
export function getGroupDialogueById (uid) {
  return request({
    url:'/getGroupDialogueById',
    params:{
      uid
    }
  })
}
export function getGroupDialogueByName (name) {
  return request({
    url:'/getGroupDialogueByName',
    params:{
      name
    }
  })
}