import request from '@/utils/request.js'
// 非组件模块获取store
// import store from '@/store/'
/**
 * 登录
 */
export const login = params => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    params
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = params => {
  return request({
    method: 'GET',
    url: '/api/app/v1_0/user/profile',
    params
  })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/**
 * 获取推荐文章列表
 */
export const getUserChannelArtiles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
