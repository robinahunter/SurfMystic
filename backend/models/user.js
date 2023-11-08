const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, minlength: 6, required: true },
  name: { type: String, required: true },
  note: { type: String, },
  favoriteLocation: [
      {
        locationName: String, // Name of the location 
        locationUrl: String, // Code or identifier for the location /NWS location code
      },
    ],
  image: { type: [String], },
})

module.exports = mongoose.model('User', UserSchema)
