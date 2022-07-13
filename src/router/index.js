import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        redirect: 'home',
        // component: () => import('@/views/home')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home')
      },

      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'askQuestion',
        name: 'askQuestion',
        component: () => import('@/views/ask-question')
      }
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true

  }

]

const router = new VueRouter({
  routes
})

export default router
