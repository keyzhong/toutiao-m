import request from '@/utils/request.js'
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
