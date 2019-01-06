import axios from '@/lib/axios'

export default {
  searchAllApps () {
    return axios.get('searchApps')
  },
  installApp (app) {
    return axios.post('installApp', app)
  },
  uninstallAPp (app) {
    return axios.post('uninstallApp', app)
  }
}
