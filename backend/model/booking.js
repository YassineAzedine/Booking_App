
const mongoose = require("mongoose")
const bookingSchema = mongoose.Schema({
    Date_started  :  {type : Date , required : true} , 
    Date_end :  {type : Date , required : true} , 
  room : {type : mongoose.Types.ObjectId , ref : "Room"},
  user : {type : mongoose.Types.ObjectId , ref :"User"}
})
const Booking = mongoose.model("Booking" , bookingSchema )

module.exports = Booking


