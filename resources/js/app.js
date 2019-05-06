import './bootstrap'
import Vue from 'vue'
import router from './router.js'
import store from './store'
import App from './App.vue'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
Vue.use(Loading)
Vue.component('Loading', Loading)

require('./bootstrap')

const createApp = async () => {
  await store.dispatch('auth/currentUser')

  const app = new Vue({ // eslint-disable-line no-unused-vars
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App />'
  })
}

createApp()
