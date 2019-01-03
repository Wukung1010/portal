const state = {
  current: {}
}

const getters = {
  getCurrentMenu (state) {
    return state.current
  }
}

const mutations = {
  setCurrentMenu (state, menu) {
    state.current = menu
  }
}

export default {
  state,
  getters,
  mutations
}
