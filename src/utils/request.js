import axios from 'axios'
import store from '@/store/'
import JSONBig from 'json-bigint'
const request = axios.create({
  // baseURL: '/api', // 基础路径
  // baseURL: ' https://toutiao.m.lipengzhou.com/api/',
  baseURL: 'http://ttapi.research.itcast.cn/',
  headers: {
    Authorization: ''
  },
  // 返回数据之前先处理
  transformResponse: [
    function (data) {
      try {
        return JSONBig.parse(data)
      } catch {
        return data
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = ''
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
