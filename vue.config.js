const path = require('path')

module.exports = {
  indexPath: path.join(__dirname, './index.html'),
  configureWebpack: config => {
    config.entry = './web/src'
    config.resolve.alias['@'] = path.join(__dirname, './web/src/')
    config.resolve.alias['_c'] = path.join(__dirname, './web/src/components')
  }
}