const fs = require("fs");
require('colors');

const mongoose = require("mongoose");
const Room = require("../../model/room");

const Booking = require("../../model/booking");


//conncet to db
mongoose
  .connect("mongodb+srv://webw23346:yassine0711@cluster0.yyfuyex.mongodb.net/Booking?retryWrites=true&w=majority&appName=Cluster0")
  .then((conn) => {
    console.log("connected", );
  })
  .catch((err) => {
    console.log("error", err);
  });
//read data with json file
const rooms = JSON.parse(fs.readFileSync("./romms.json"));
//insert data into DB
const insertData = async () => {
  try {
    await Room.create(rooms);
    console.log("data Inserted".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
//delete data from DB
const destroyData = async () => {
    try{
      // await Booking.deleteMany()
         await Room.deleteMany()
      
      console.log("data destroy".red.inverse)
      process.exit();
    }catch(error){
        console.log(error)

    }
};

//node seeder.js -d 
if(process.argv[2] === "-i"){
    insertData()
}else if(process.argv[2] === "-d"){
    destroyData()
}