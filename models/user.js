var mongoose = require("mongoose");

var userSchema =  mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    cover: {type:String, default:"cover.png"},
    profile_pic: {type:String, default:"pic.png"}
})

module.exports = mongoose.model("User", userSchema);

