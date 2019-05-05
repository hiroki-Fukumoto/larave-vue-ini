import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './pages/Login.vue'
import ExampleList from './pages/ExampleList.vue'
import ExampleDetail from './pages/ExampleDetail.vue'
import SystemError from './pages/errors/System.vue'
import NotFound from './pages/errors/NotFound.vue'

import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    beforeEnter (to, from, next) {
      if (store.getters['auth/check']) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    component: ExampleList,
    meta: { requiresAuth: true }
  },
  {
    path: '/items/:id',
    component: ExampleDetail,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/500',
    component: SystemError
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 認証が必要なページには
// meta: { requiresAuth: true }
// を記述してください
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 未認証の場合はログインページにリダイレクトします。
    if (!store.getters['auth/check']) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
