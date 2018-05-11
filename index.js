require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const errorHandler = require('./handlers/error')
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/messages')
const { loginRequired, ensureCorrectUser } = require('./middleware/auth')

const PORT = 8081;

app.use(cors())
app.use(bodyParser.json())

// TODO: all routes here -
app.use('/api/auth', authRoutes)
app.use(
  '/api/users/:id/messages',
  loginRequired,
  ensureCorrectUser,
  messageRoutes
)

app.get('/api/messages', loginRequired, async (res, req, next) => {
  try {
    const messages = await db.Message.find()
      .sort({ createdAt: 'desc'})
      .populate("user", {
        username: true,
        profileImageUrl: true
      })
    return res.status(200).json(messages)
  } catch (e) {
    return next(e)
  }
})

app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})