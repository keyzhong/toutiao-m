import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

// 定义常量
const USER_INFO = 'user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_INFO)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // localStorage.setItem('user', JSON.stringify(state.user))
      // 为了防止刷新页面数据丢失 数据放到本地存储中 持久化数据
      setItem(USER_INFO, data)
    }
  },
  actions: {},
  modules: {}
})
