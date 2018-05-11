const db = require('../models') // gets index.js
const jwt = require('jsonwebtoken')

exports.signin = async (req, res, next) => {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    })
    const { id, username, profileImageUrl } = user
    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
      const token = jwt.sign({
          id,
          username,
          profileImageUrl
        }, process.env.SECRET_KEY
      )
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      })
    } else {
      return next({
        status: 400,
        message: 'Invalid Email/Password'
      })
    }
    
  } catch (e) {
    return next(e)
  }
}

exports.signup = async (req, res, next) => {
  try {
    // create a user
    const user = await db.User.create(req.body)
    const { id, username, profileImageUrl } = user
    const token = jwt.sign({
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
    )
    return res.status(201).json({ id, username, profileImageUrl, token })
    // create a token (signing a token)
    // process.env.SECRET_KEY
  } catch (e) {
    // see what kind of error
    if (e.code === 11000) {
      e.message = "Sorry, that username and/or email is taken."
    }
    return next({
      status: 400,
      message: e.message
    })
    // respond with username/email already taken
    // otherwise just send back a generic 400b
  }
}
