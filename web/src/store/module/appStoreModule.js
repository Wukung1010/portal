import AppStoreAPI from '@/api/appStoreAPI'

const state = {
  installedApps: []
}

const mutations = {
  installApp (state, app) {
    state.installedApps.push(app)
  },
  uninstallApp (state, delApp) {
    let index = state.installedApps.findIndex(app => app.key === delApp.key)
    if (index > -1) {
      state.installedApps.splice(index, 1)
    }
  }
}

const getters = {
  getAllInstalledApps (state) {
    return state.installedApps
  }
}

const actions = {
  searchAllApps () {
    return AppStoreAPI.searchAppApps()
  },
  installApp ({commit}, app) {
    return new Promise(resolve => {
      AppStoreAPI.installApp(app).then(result => {
        commit('installApp', app)
        resolve(result)
      })
    })
  },
  uninstallApp ({commit}, app) {
    return new Promise(resolve => {
      AppStoreAPI.uninstallApp(app).then(result => {
        commit('uninstallApp', app)
        resolve(result)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
