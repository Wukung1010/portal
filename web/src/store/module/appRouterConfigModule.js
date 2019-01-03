// import API from '@/api/appStore'

/**
 * {id: 'id', user: 'userKey', title: 'title',app: 'appKey', parent: 'id', isDefault: true}
 * {id: 'id', user: 'userKey', title: 'title', app: 'appKey', parent: 'id'}
 */
const state = {
  configs: [
    {id: '1', user: 'userKey', title: 'home',app: 'appKey', parent: '', isDefault: true},
    {id: '2', user: 'userKey', title: 'App Store',app: 'appKey', parent: '', isDefault: true},
    {id: '3', user: 'userKey', title: 'App Router Config',app: 'appKey', parent: '', isDefault: true},
    {id: '4', user: 'userKey', title: 'App List',app: 'appKey', parent: '', isDefault: true},
    {id: '5', user: 'userKey', title: 'App1',app: 'appKey', parent: '4', isDefault: false},
    {id: '6', user: 'userKey', title: 'App2',app: 'appKey', parent: '4', isDefault: false},
    {id: '7', user: 'userKey', title: 'App3',app: 'appKey', parent: '4', isDefault: false},
    {id: '8', user: 'userKey', title: 'App4',app: 'appKey', parent: '4', isDefault: false},
  ]
}

const getters = {
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
  deleteConfig (state, delConfig) {
    let mapper = {}
    state.configs.forEach(config => {
      mapper[config.id] = config
    })
    let set = new Set()
    let i = 0
    while (i < state.configs.length) {
      let config = state.configs[i]
      if (config.id === delConfig.id || set.has(config.id)) {
        state.configs.splice(i, 1)
      } else {
        let temp = []
        let deleted = false
        while (config.parent) {
          config = mapper[config.parent]
          temp.push(config.id)
          if (config.id === delConfig.id) {
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
