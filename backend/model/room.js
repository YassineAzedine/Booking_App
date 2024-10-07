const mongoose = require("mongoose")
const roomSchema = mongoose.Schema({

  hotelName  : {type : mongoose.Schema.ObjectId, ref:"Hotel"} , 

  imageUrl: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
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
}, {
  timestamps: true,
});

const Room = mongoose.model("Room" , roomSchema )

module.exports = Room

