import request from '@/utils/request.js'
// 非组件模块获取store
// import store from '@/store/'
/**
 * 登录
 */
export const login = params => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    params
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    params
  })
}
