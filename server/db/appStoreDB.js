const DB = require('./db')

const form = 'appForm'

module.exports = {
  queryAllInstalledApps () {
    return DB.query(form, {})
  },
  installApp (app) {
    return DB.insert(form, app)
  },
  deleteApp (app) {
    return DB.delete(form, {
      key: app.key
    })
  },
  deleteApps (app) {
    return DB.deleteMany(form, {
      key: app.key
    })
  },
  isAppInstalled (app) {
    return DB.query(form, {
      key: app.key
    })
  }
}