require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const errorHandler = require('./handlers/error')
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/messages')

const PORT = 8081;

app.use(cors())
app.use(bodyParser.json())

// TODO: all routes here -
app.use('/api/auth', authRoutes)
app.use('/api/users/:id/messages', messageRoutes)

app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})