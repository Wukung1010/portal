const mongodb = require('mongodb').MongoClient
const url = require('./db.config').url
const dbHome = require('./db.config').dbHome
const test = 'test'

let DB = null

function checkDB () {
  if (DB && DB.isConnected()) {
    return Promise.resolve(DB.db(dbHome))
  } else {
    return new Promise(resolve => {
      mongodb.connect(url, (err, db) => {
        if (err) {
          throw err
        }
        DB = db
        resolve(DB.db(dbHome))
      })
    })
  }
}

function dbOpt (fn) {
  return checkDB().then(db => {
    return new Promise((resolve, reject) => {
      fn(db, resolve, reject)
    })
  })
}

module.exports = {
  query (form, where) {
    return dbOpt((db, resolve, reject) => {
      db.collection(form).find(where).toArray((err, result) => {
        err? reject(err):resolve(result)
      })
    })
  },
  delete (form, where) {
    return dbOpt((db, resolve, reject) => {
      db.collection(form).deleteOne(where, (err, result) => {
        err? reject(err):resolve(result)
      })
    })
  },
  deleteMany (form, where) {
    return dbOpt((db, resolve, reject) => {
      db.collection(form).deleteMany(where, (err, result) => {
        err? reject(err):resolve(result)
      })
    })
  },
  insert (form, document) {
    return dbOpt((db, resolve, reject) => {
      db.collection(form).insert(document, (err, result) => {
        err? reject(err):resolve(result)
      })
    })
  },
  update (form, where, document) {
    return dbOpt((db, resolve, reject) => {
      db.collection(form).update(where, document, (err, result) => {
        err? reject(err):resolve(result)
      })
    })
  },
  test () {
    // test
    mongodb.connect(url, (err, db) => {
      if (err) {
        throw err
      }
      let dbo = db.db(dbHome)
      new Promise((resolve, reject) => {
        dbo.collection(test).insertOne({
          name: 'test',
          age: 1
        }, (err) => {
          if (err) {
            reject(err)
          }
          dbo.collection(test).find({}).toArray((err, result) => {
            if (err) {
              reject(err)
            }
            resolve(result)
          })
        })
      }).then(result => {
        console.info(result)
      }).catch(e => {
        console.info(e)
      }).finally(() => {
        db.close()
      })
    })
  }
}
