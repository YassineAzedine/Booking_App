
const mongoose = require("mongoose")
const bookingSchema = mongoose.Schema({
  name : {type : String , required : true}  ,
  email :{type : String , required : true}  ,
  address : {type : String , required : true} ,
    Date_started  :  {type : Date , required : true} , 
    Date_end :  {type : Date , required : true} , 
  room : {type : mongoose.Types.ObjectId , ref : "Room"},
  user : {type : mongoose.Types.ObjectId , ref :"User"},
  paymentInfo: {
    creditCardNumber:{type : Number , required : true} , 
    expirationDate:{type : Date , required : true} ,  // MM/YY format
    cvv:  {type : Number , required : true} , 
}
})
const Booking = mongoose.model("Booking" , bookingSchema )

module.exports = Booking


