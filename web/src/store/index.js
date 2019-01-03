import Vue from 'vue'
import Vuex from 'vuex'
import AppStoreModule from './module/appStoreModule'
import AppRouterConfigModule from './module/appRouterConfigModule'
import RouterModule from './module/routerModule'
import TagModule from './module/tagModule'
import UserModule from './module/userModule'
import MenuModule from './module/menuModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  modules: {
    AppStoreModule,
    AppRouterConfigModule,
    RouterModule,
    TagModule,
    UserModule,
    MenuModule
  }
})
