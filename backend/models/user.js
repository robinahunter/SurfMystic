const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, minlength: 6, required: true },
  note: { type: [String], },
  favoriteLocation: { type: [String], },
  image: { type: [String], },
})

module.exports = mongoose.model('User', UserSchema)
