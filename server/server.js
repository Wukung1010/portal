const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const port = require('./config').port
const router = require('./router')

const app = new express()

app.use(bodyparser.json())

app.use(express.static(path.join(__dirname, '../appStore')))

router.use(app)

app.listen(port, () => {
  console.info(`server running port ${port}`)
})