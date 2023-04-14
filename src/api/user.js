import request from '@/utils/request'

export function login(data) {
  // 用户登录
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  // 获取用户信息
  return request({
    url: `users/${id}`,
    method: 'get'
  })
}
