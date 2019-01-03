import App from './app.vue'
import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import router from './router'
import Vuex from 'vuex'
import store from './store'

import 'iview/dist/styles/iview.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(iView)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
