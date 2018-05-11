require('dotenv').load()
const jwt = require('jsonwebtoken')

// make sure user logged in - Authentication
exports.loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      return decoded ? next() : next({
        status: 401,
        message: 'Please log in first'
      })
    })
  } catch (e) {
    return next({
      status: 401,
      message: 'Please log in first'
    })
  }
  
}

// make sure we get the correct user - Authorization
exports.ensureCorrectUser = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.id === req.params.id) {
        return next()
      } else {
        return next({
          status: 401,
          message: 'Unauthorized'
        })
      }
    })
  }catch (e) {
    return next({
      status: 401,
      message: 'Unauthorized'
    })
  }
}

