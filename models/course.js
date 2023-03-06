var mongoose = require("mongoose");

var courseSchema =  mongoose.Schema({
    ref: String,
    transporter: String,
    client: String,
    cargo: String,
    payment_type: String,
})

module.exports = mongoose.model("Course", courseSchema);

