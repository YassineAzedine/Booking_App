const mongoose = require("mongoose")
const roomSchema = mongoose.Schema({
  title : {type  : String  , required : [true , "titel is required"]} , 
  hotelName  : {type : mongoose.Schema.ObjectId, ref:"Hotel"} , 
  imageCover: {
    type: String,
    required: true,
  },
  images: [String],
  pricePerNight: {
    type: Number,
    required: [true , 'price per night is required'],
  },
  bedCount: {
    type: Number,
    required: true,
  },
  bathroomCount: {
    type: Number,
    required: true,
  },
  maxOccupancy: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  ratingsAverage : {
    type : Number , 
    min : [1 , 'Rating must be above or equal 1.0'], 
    max : [5 , 'Rating must be below or equal 5.0'] 
  } , 

  ratingsQuantity : {
   type : Number , 
   default : 0
  }

}, {
  timestamps: true,
});
// Mongoose query middleware
roomSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'hotelName',
    select: 'name -_id',
  });
  next();
});

const Room = mongoose.model("Room" , roomSchema )

module.exports = Room

