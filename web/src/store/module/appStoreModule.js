import AppStoreAPI from '@/api/appStoreAPI'

const state = {
  installedApps: [
    { id: 'appStore',name: '应用商店',author: 'sunxianfeng',version: 'v0.1',url: ['appStore/app.bundle.js'], isDefault: true },
    { id: 'dataentry',name: '数据录入',author: 'sunxianfeng',version: 'v0.1',url: ['dataentry/dream.umd.js'], isDefault: false }
  ],
  allApps: []
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
  },
  setAllApps (state, apps) {
    state.allApps = apps
  }
}

const getters = {
  getInstalledApps (state) {
    return state.installedApps
  }
}

const actions = {
  searchAllApps ({commit}) {
    return new Promise(resolve => {
      AppStoreAPI.searchAllApps().then(data => {
        if (Array.isArray(data)) {
          commit('setAllApps', data)
        }
        resolve(data)
      })
    })
  },
  installApp ({commit}, app) {
    //test
    commit('installApp', app)
    return Promise.resolve()

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
