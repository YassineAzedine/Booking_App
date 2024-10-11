const Booking = require("../model/booking");
const Room = require("./../model/room");
const mongoose = require("mongoose")
async function CreateBooking(req ,res){

    
   
 try{
     // Check if the provided room ID is valid
     if (!mongoose.Types.ObjectId.isValid(req.body.room)) {
        return res.status(400).send({ message: "Invalid room ID" });
      }
    const room = await Room.findOne({_id : req.body.room})
    if(!room){
        return res.status(404).send({message  : "room not found"})
    }
    const newBooking  = {
        Date_started : req.body.Date_started ,  
        Date_end : req.body.Date_end ,
        room  : req.body.room , 
        user : req.user_id
    } 
    const booking = await Booking.create(newBooking)

    
 res.status(200).send({"message" : "Booking create with success" ,  booking})
 }catch(error){
    console.error(error);
    res.status(500).send({ message: "Internal server error", error: error.message });
 }

}
async function FindBooking (req,res){
try{
   const booking = await Booking.find().populate("room")
   if(!booking){
    return res.status(404).send({message: "Booking not found"})
   }
     res.status(200).send({message : "booking find with success" , data : booking})
}catch(err){
    console.error(err)
    res.status(500).send({"error" : err.message})

}
}
module.exports  = {
    CreateBooking , FindBooking
}