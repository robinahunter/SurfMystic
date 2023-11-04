const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, minlength: 6, required: true },
  name: { type: String, required: true },
  notes: { type: String, },
  favoriteLocations: [
      {
        locationName: String, // Name of the location 
        locationCode: String, // Code or identifier for the location /NWS location code
      },
    ],
  images: { type: [String], },
})

module.exports = mongoose.model('User', UserSchema)
