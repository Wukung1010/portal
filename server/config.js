const path = require('path')

module.exports = {
  port: 3000,
  appStorePath: path.join(__dirname, '../appStore'),
  appConfigFileName: 'app.config.json',
  onlySearchDir: true
}