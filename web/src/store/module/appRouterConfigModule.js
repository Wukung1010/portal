// import API from '@/api/appStore'

/**
 * {id: 'id', user: 'userKey', title: 'title',app: 'appID', parent: 'id', isDefault: true}
 * {id: 'id', user: 'userKey', title: 'title', app: 'appID', parent: 'id'}
 */
const state = {
  configs: [
    {id: '1', user: 'userKey', icon: 'ios-paper-outline', title: 'home',app: 'appID', parent: '', isGroup: false, isDefault: true},
    {id: '2', user: 'userKey', icon: 'ios-paper-outline', title: 'App Store',app: 'appStore', parent: '', isGroup: false, isDefault: true},
    {id: '3', user: 'userKey', icon: 'ios-paper-outline', title: 'App Router Config',app: 'appRouterConfig', isGroup: false, parent: '', isDefault: false},
    {id: '4', user: 'userKey', icon: 'ios-paper-outline', title: 'App List',app: 'appID', parent: '', isGroup: true, isDefault: true},
    {id: '5', user: 'userKey', icon: 'ios-paper-outline', title: 'App1',app: 'dataentry', parent: '4', isGroup: false, isDefault: false},
    {id: '6', user: 'userKey', icon: 'ios-paper-outline', title: 'App2',app: 'appID', parent: '4', isGroup: false, isDefault: false},
    {id: '7', user: 'userKey', icon: 'ios-paper-outline', title: 'App3',app: 'appID', parent: '4', isGroup: false, isDefault: false},
    {id: '8', user: 'userKey', icon: 'ios-paper-outline', title: 'App4',app: 'appID', parent: '4', isGroup: false, isDefault: false}
  ],
  currentConfig: null
}

const getters = {
  getAppConfigList (state) {
    return state.configs
  },
  getAppConfigTree (state) {
    let tree = []
    let mapper = {}
    state.configs.forEach(config => {
      let cloneConfig = Object.assign({}, config)
      if (!cloneConfig.parent) {
        tree.push(cloneConfig)
      }
      mapper[cloneConfig.id] = cloneConfig
    })
    Object.keys(mapper).forEach(id => {
      let config = mapper[id]
      if (config.parent) {
        let parent = mapper[config.parent]
        parent.children || (parent.children = [])
        parent.children.push(config)
      }
    })
    return tree
  },
  getCurrentConfig (state) {
    return state.currentConfig
  }
}

const mutations = {
  init (state, configs) {
    state.configs = configs
  },
  insertConfig (state, config) {
    if (config) {
      state.configs.push(config)
    }
  },
  deleteConfig (state, id) {
    let mapper = {}
    state.configs.forEach(config => {
      mapper[config.id] = config
    })
    let set = new Set()
    let i = 0
    while (i < state.configs.length) {
      let config = state.configs[i]
      if (config.id === id || set.has(config.id)) {
        state.configs.splice(i, 1)
      } else {
        let temp = []
        let deleted = false
        while (config.parent) {
          config = mapper[config.parent]
          temp.push(config.id)
          if (config.id === id) {
            temp.forEach(id => set.add(id))
            state.configs.splice(i, 1)
            deleted = true
            break
          }
        }
        if (!deleted) {
          i ++
        }
      }
    }
  },
  updateConfig (state, config) {
    if (config) {
      let index = state.configs.findIndex(c => config.id === c.id)
      if (index > -1) {
        state.configs.splice(index, 1, config)
      }
    }
  },
  setCurrentConfig (state, id) {
    let config = state.configs.find(config => config.id === id)
    if (config) {
      state.currentConfig = config
    }
  }
}

const actions = {
  updateToServer () {
    // API.update()
  }
}

// export default {
//   state,
//   getters,
//   mutations,
//   actions
// }

module.exports = {
  state,
  getters,
  mutations,
  actions
}
