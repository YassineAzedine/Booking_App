const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
  name :  {type : String , trim : true , required : [true , "name required"]} ,
  slug : { type : String , lowercase : true} ,  
  email : {type : String , required : [true , "email required"] , unique : true , lowercase : true} ,
  phone: String  , 
  profileImg : String , 
  password  : {type : String , required : [true , 'password required'] , minlength : [6 , "To short password"]} , 
  passwordwordChangedAt : Date  , 
  passwordResetCode : String , 
  passwordResetExpires : String ,
  passwordResetVerified : Boolean ,
  role  : {type : String , enum : ['admin' , 'owner' , 'client'] , default : 'client'} ,
  active :{
    type :Boolean ,
    default : true
  } ,
  wishlist  : [
    {
      type : mongoose.Schema.ObjectId , 
      ref : 'Product'
    } 
  ],
addresses : [
  {
    id : {type : mongoose.Schema.Types.ObjectId} ,
    alias : String , 
    detailes : String ,
    phone : String ,
    city : String ,
    postalCode  : String
  
  }
],

},{
  timestamps : true
})  ;

const User = mongoose.model("User" , userSchema )

module.exports = User

