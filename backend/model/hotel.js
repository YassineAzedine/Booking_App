
const mongoose = require("mongoose")
const hotelSchema = mongoose.Schema({
  name :  {type : String ,
          required : [true , 'Hotel required'],
          unique : [true , 'Hotel must be unique '],
          minlength : [3 , 'To short hotel name'] ,
          maxlength : [32 , 'Too long hotel name']
          } , 

  slug : {
    type : String , 
    lowercase : true ,
  },
  image : String  ,    
  description : {type : String , required : true}
} , {timestamps : true})
const Hotel = mongoose.model("Hotel" , hotelSchema )

module.exports = Hotel

