import request from './request'
export default function storePrivateDialogue (myself,friend,content,date = '') {
  return request({
    url:'/storePrivateDialogue',
    method:'post',
    params:{  
      myself,
      friend,
      content,
      date
    }
  })
}