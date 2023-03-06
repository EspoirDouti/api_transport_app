var mongoose = require("mongoose");
var demandSchema =  mongoose.Schema({
    cargo: {type: String, enum: ['General Food', 'Bulk Transport', 'Car Transport', 'Refrigerated Transport', 'Food Liquids', 'Live Animals', 'Exceptional Transport','Dangerous Food']},
    truck: {type: String, enum: ['Any', 'Small', 'Light', 'Medium', 'Heavy']},
    date: String,
    hour:String,
    location_from: String,
    city_from:String,
    location_to: String,
    city_to:String,
    dimension: String, 
    payment_type: {type: String, enum: ['Fixed price', 'Request quote', 'Payment method']},
    client_id:{},
    postulants:{type: Array, default: []}
})

module.exports = mongoose.model("Demand", demandSchema);
