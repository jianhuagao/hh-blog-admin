import request from './request'

export function login(user) {
  return request({
    method:"post",
    url: '/login',
    data:user
  })
}
