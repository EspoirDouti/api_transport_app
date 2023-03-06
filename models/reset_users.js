// models/token.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,// this is the expiry time in seconds (10min)
  },
});
module.exports = mongoose.model("Token", tokenSchema);