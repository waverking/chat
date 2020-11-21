import request from './request'
export default function storeGroupDialogue (name,user,content,date = '') {
  return request({
    url:'/storeGroupDialogue',
    method:'post',
    params:{
      name,
      user,
      content,
      date
    }
  })
}