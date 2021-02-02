import axios from 'axios'
import store from '@/store/'
const request = axios.create({
  // baseURL: '/api', // 基础路径
  // baseURL: ' https://toutiao.m.lipengzhou.com/api/',
  baseURL: 'http://ttapi.research.itcast.cn/',
  headers: {
    Authorization: ''
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = ''
      // 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU'
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default request
