const mongoose = require('mongoose')

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
  },

)

module.exports = mongoose.model('Admin', adminSchema)
