import axios from 'axios'
import config from '@/config/axios.config.js'

const serviceHost = config.host + ':' + config.port + '/'

export default {
  get (url, options = {}) {
    return axios.get(serviceHost + url, options)
  },
  post (url, options = {}) {
    return axios.post(serviceHost + url, options)
  }
}
