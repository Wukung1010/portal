const state = {
  currentRouter: {
    name: 'login',
    isDefault: true
  }
}

const getters = {
  getCurrentRouter (state) {
    return state.currentRouter
  }
}

const mutations = {
  setRouter (state, router) {
    state.currentRouter =  router
  }
}

export default {
  state,
  getters,
  mutations
}
