import request from './request'
export function getAllRequestUsers (sendUIDS) {
  return request({
    url:'/getAllRequestUsers',
    params:{sendUIDS}
  })
}