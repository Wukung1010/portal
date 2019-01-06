const db = require('../db/appStoreDB')
const searchApp = require('./searchApp')

class AppStore {
  constructor () {}
  searchApps () {
    return searchApp()
  }
  installApp (app) {
    return db.installApp(app)
  }
  uninstallApp (app) {
    return db.uninstallApp(app)
  }
}

module.exports = new AppStore()
