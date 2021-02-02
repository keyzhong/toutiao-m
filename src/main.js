import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant, { Lazyload } from 'vant'

// import '@/mock/mock.js'
import '@/utils/dayjs'

import 'vant/lib/index.css'
import 'amfe-flexible'

import '@/styles/index.less'

import safeGet from '@/utils/getDataNoBug'
Vue.use(safeGet)

Vue.config.productionTip = false

Vue.use(vant)
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
