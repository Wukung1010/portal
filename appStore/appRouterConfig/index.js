import Vue from 'vue'
import Vuex from 'vuex'
import test from './test.vue'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import store from '../../web/src/store'

Vue.use(Vuex)
Vue.use(iView)

new Vue({
  el: '#app',
  store,
  render: h => h(test)
})