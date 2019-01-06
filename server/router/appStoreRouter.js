const router = require('express').Router()
const AppStore = require('../appStore')

router.get('/searchApps', (req, res) => {
  AppStore.searchApps().then(result => {
    res.set('Access-Control-Allow-Origin', '*')
    res.json(result).end()
  })
})

router.post('/installApp', (req, res) => {
  let app = req.body
  AppStore.installApp(app).then(result => {
    res.end(JSON.stringify(result))
  })
})

router.post('/uninstallApp', (req, res) => {
  let app = req.body
  AppStore.uninstallApp(app).then(result => {
    res.end(JSON.stringify(result))
  })
})

module.exports = router