var mongoose = require("mongoose");

var transporterSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    location: String,
    truck:{type: String, enum: ['Any', 'Small', 'Light', 'Medium', 'Heavy']},
    company_id: String
})

module.exports = mongoose.model("Transporter", transporterSchema);
