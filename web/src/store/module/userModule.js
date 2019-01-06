import { setToken, getToken, setTenant, getTenant } from '@/lib/util'
import axios from '@/lib/axios'

const state = {
  userName: '',
  token: getToken(),
  tenant: getTenant()
}

const mutations = {
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
  setTenant (state, tenant) {
    state.tenant = tenant
    setTenant(tenant)
  }
}

const actions = {
  // 登录
  handleLogin ({ commit }, { userName, password }) {
    let options = {
      transformRequest: [data => {
        return 'username=' + userName + '&password=' + password + '&tenant=tt'
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }
    return axios.post('/api/login', options).then((res) => {
      if (res.data) {
        commit('setToken', response.data.token)
        commit('setTenant', response.data.tenant)
      }
    })
  },
  // 注销
  handleLogOut ({ state, commit }) {
    let options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }
    return axios.post('/logout', options).then((res) => {
      commit('setToken', '')
      commit('setTenant', '')
    })
  }
}

export default {
  state,
  mutations,
  actions
}
