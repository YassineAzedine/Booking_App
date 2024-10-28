const Booking = require("../model/booking");
const Room = require("./../model/room");

const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apiFeatures");

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
      await Room.findOneAndUpdate({_id :room._id },{ $set: { isAvailable: false }})

    const newBooking  = {
        name: req.body.name,
        email : req.body.email , 
        address : req.body.address , 
        Date_started : req.body.Date_started,  
        Date_end : req.body.Date_end,
        room  : req.body.room , 
        user : req.user_id , 
        paymentInfo : {
            creditCardNumber : req.body.paymentInfo.creditCardNumber ,
            expirationDate : req.body.paymentInfo.expirationDate , 
            cvv :  req.body.paymentInfo.cvv
        }
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
   const documentsCounts = await Booking.find().populate("room")
   const apiFeatures = new ApiFeatures(Booking.find(), req.query)
   .paginate(documentsCounts)
   .filter()
   .search(Booking)
   .limitFields()
   .sort();
   const { mongooseQuery, paginationResult } = apiFeatures;
   const documents = await mongooseQuery;
   res
     .status(200)
     .send({ results: documents.length, paginationResult, data: documents });
}catch(err){
    console.error(err)
    res.status(500).send({"error" : err.message})

}
}
const  DeleteBooking = asyncHandler(
    async (req , res )=> {
        //recuperer id with url 
        const { id } = req.params
        //find id if existe and update 
        await Booking.findOneAndDelete(id)
 

        //return message 
        res.json({message : "Booking deleted with success"})
        }
)

module.exports  = {
    CreateBooking , FindBooking , DeleteBooking
}