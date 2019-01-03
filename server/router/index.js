const appStoreRouter = require('./appStoreRouter')

module.exports = {
  use (app) {
    app.use(appStoreRouter)
  }
}
