const path = require('path')

module.export = {
  port: 3000,
  appStorePath: path.join(__dirname, '../appStore'),
  appConfigFileName: 'app.config.js',
  onlySearchDir: true
}