const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  }
})

// this is run on all users before they are saved
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    return next()
  } catch (e) {
    return next(e)
  }
})

userSchema.methods.comparePassword = async function(candidate, next) {
  try {
    const isMatch = await bcrypt.compare(candidate, this.password)
    return isMatch
  } catch (e) {
    return next(err)
  }
}
const User = mongoose.model("User", userSchema)

module.exports = User