import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

// 定义常量
const USER_INFO = 'user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_INFO),
    cachePage: ['LayoutIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // localStorage.setItem('user', JSON.stringify(state.user))
      // 为了防止刷新页面数据丢失 数据放到本地存储中 持久化数据
      setItem(USER_INFO, data)
    },
    addCachePage (state, pageName) {
      if (!state.cachePage.includes(pageName)) {
        state.cachePage.push(pageName)
      }
    },
    removeCachePage (state, pageName) {
      const index = state.cachePage.indexOf(pageName)
      if (index === -1) {
        state.cachePage.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
