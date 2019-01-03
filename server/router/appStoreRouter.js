const router = require('express').Router()
const AppStore = require('../appStore')

router.get('/searchApps', (req, res) => {
  AppStore.searchApps().then(result => {
    res.end(result)
  })
})

router.post('installApp', (req, res) => {
  let app = req.body
  AppStore.installApp(app).then(result => {
    res.end(result)
  })
})

router.post('uninstallApp', (req, res) => {
  let app = req.body
  AppStore.uninstallApp(app).then(result => {
    res.end(result)
  })
})