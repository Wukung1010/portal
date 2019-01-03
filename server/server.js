const express = require('express')
const bodyparser = require('body-parser')
const { port } = require('./config')
const router = require('./router')

const app = new express()

app.use(bodyparser.json())

router.use(app)

app.linsten(port, () => {
  console.info(`server running port ${port}`)
})