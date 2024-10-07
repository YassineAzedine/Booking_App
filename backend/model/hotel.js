
const mongoose = require("mongoose")
const hotelSchema = mongoose.Schema({
  name :  {type : String , required : true} , 
  description : {type : String , required : true}
})
const Hotel = mongoose.model("Hotel" , hotelSchema )

module.exports = Hotel

