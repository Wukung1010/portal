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
        let appPath = path.join(appStorePath, dirent.name, appConfigFileName)
        try {
          let config = fs.readFileSync(appPath)
          config.url = path.join(appPath, config.url)
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
