import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },

  {
    path: '/home',
    component: () => import('@/views/home')
  },

  {
    path: '/category',
    component: () => import('@/views/category')
  },

  {
    path: '/cart',
    component: () => import('@/views/cart')
  },

  {
    path: '/profile',
    component: () => import('../views/profile')
  },

  {
    path: '/detail/:id',
    component: () => import('../views/detail')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
