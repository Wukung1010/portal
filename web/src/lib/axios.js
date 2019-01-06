import axios from 'axios'
import config from '@/config/axios.config.js'

const serviceHost = config.host + ':' + config.port + '/'

const defaultOptions = {
  headers: {
    'Content-Type': 'charset=utf-8'
  }
}

export default {
  get (url, options = defaultOptions) {
    return new Promise(resolve => {
      axios.get(serviceHost + url, options).then(response => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          console.error(response)
          resolve({
            message: response.status
          })
        }
      })
    })
  },
  post (url, options = defaultOptions) {
    return new Promise(resolve => {
      axios.post(serviceHost + url, options).then(response => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          console.error(response)
          resolve({
            message: response.status
          })
        }
      })
    })
  }
}
