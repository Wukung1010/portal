const appStore = require('./appStoreDB')

const app = {
  name: '测试应用',
  key: 'testApp',
  url: 'url',
  author: 'sunxianfeng',
  version: 'v0.1',
  data: 'data'
}

new Promise(resolve => {
  console.info('queryAllInstalledApps')
  appStore.queryAllInstalledApps().then(result => {
    console.info(result)
    resolve()
  })
}).then(() => {
  return Promise.resolve({
    then (resolve) {
      console.info('installApp')
      appStore.installApp(app).then(result => {
        console.info(result)
        resolve()
      })
    }
  })
}).then(() => {
  return Promise.resolve({
    then (resolve) {
      console.info('queryAllInstalledApps')
      appStore.queryAllInstalledApps().then(result => {
        console.info(result)
        resolve()
      })
    }
  })
}).then(() => {
  return Promise.resolve({
    then (resolve) {
      console.info('isAppInstalled')
      appStore.isAppInstalled(app).then(result => {
        console.info(result)
        resolve()
      })
    }
  })
}).then(() => {
  return Promise.resolve({
    then (resolve) {
      console.info('deleteApps')
      appStore.deleteApps(app).then(result => {
        console.info(result)
        resolve()
      })
    }
  })
}).then(() => {
  console.info('queryAllInstalledApps')
  appStore.queryAllInstalledApps().then(result => {
    console.info(result)
  })
})
