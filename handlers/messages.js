const db = require('../models')

exports.createMessage = async (req, res, next) => {
  console.log(req.params, req.body)
  try {
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    })
    let foundUser = await db.User.findById(req.params.id)
    foundUser.messages.push(message.id)
    await foundUser.save()
    let foundMessage = await db.Message.findById(message._id).populate('user', {
      username: true,
      profileImageUrl: true
    })
    return res.status(200).json(foundMessage)
  } catch (e) {
    return next(e)
  }
}

exports.getMessage = async (req, res, next) => {

}

exports.deleteMessage = async (req, res, next) => {

}
