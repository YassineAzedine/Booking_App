
const { required } = require("joi")
const mongoose = require("mongoose")
const bookingSchema = mongoose.Schema({
  user : {type : mongoose.Types.ObjectId , ref :"User" , required : [true , 'Booking must be blong to user']},
  room : {type : mongoose.Types.ObjectId , ref : "Room"},
  name : {type : String , required : true}  ,
  email :{type : String , required : true}  ,
  address : {type : String , required : true} ,
    Date_started  :  {type : Date , required : true} , 
    Date_end :  {type : Date , required : true} , 
  paymentInfo: {
    creditCardNumber:{type : Number , required : true} , 
    expirationDate:{type : Date , required : true} ,  // MM/YY format
    cvv:  {type : Number , required : true} , 
  } , 
  isPaid: {
  type: Boolean,
  default: false,
  },
  
})
const Booking = mongoose.model("Booking" , bookingSchema )

module.exports = Booking


