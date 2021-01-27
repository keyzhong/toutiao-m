import axios from 'axios'
import store from '@/store/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU'
  }
})

// 请求拦截器
axios.interceptors.request.use(config => {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU'
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

export default request
