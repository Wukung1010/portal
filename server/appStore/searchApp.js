const path = require('path')
const fs = require('fs')
const { appStorePath, onlySearchDir, appConfigFileName } = require('../config')

function searchApps () {
  let res, rej
  let promise = new Promise((resolve, reject) => (res = resolve) && (rej = reject))
  let result = []
  fs.readdir(appStorePath, {
    withFileTypes: true
  }, (err, dirents) => {
    if (err) {
      rej(err)
    }
    dirents.forEach(dirent => {
      if (dirent.isDirectory()) {
        try {
          let config = fs.readFileSync(path.join(appStorePath, dirent.name, appConfigFileName), 'utf8')
          config = JSON.parse(config.toString())
          if (!config.url) {
            console.error(`应用没有配置正确的url：${JSON.stringify(config)}`)
            return 
          }
          if (Array.isArray(config.url)) {
            let result = []
            config.url.forEach(u => {
              result.push(path.join(dirent.name, u).replace(/\\/g, '/'))
            })
            config.url = result
          } else {
            config.url = [path.join(dirent.name, config.url).replace(/\\/g, '/')]
          }
          result.push(config)   
        } catch (error) {
          console.error(error)
        }
      }
    })
    res(result)
  })
  return promise
}

module.exports = searchApps
