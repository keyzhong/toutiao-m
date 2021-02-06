import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { keepAlive: true },
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: '',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home'), // 路由懒加载
        meta: { keepAlive: true }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    component: () => import('@/views/articleDetail'),
    props: true // 这个属性可以让跳转到的组件从prop获取路由中的参数
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
