const Room = require("../model/room");
const asyncHandler = require("express-async-handler");

const Booking = require("../model/booking");
const ApiFeatures = require("../utils/apiFeatures");

const FindAllRoom = asyncHandler(async (req, res) => {
  // const rooms = await Room.find().populate("hotelName");
  const documentsCounts = await Room.countDocuments();
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
  const apiFeatures = new ApiFeatures(Room.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search(Room)
    .limitFields()
    .sort();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const documents = await mongooseQuery;
  res
    .status(200)
    .send({ results: documents.length, paginationResult, data: documents });
});

//@desc get romms available
//@route GET /rooms/available
//@access Public
const FindAvailableRoom = asyncHandler(async (req, res) => {
  //find room is available equal true
  const documentsCounts = await Room.find({ isAvailable: true })
 
  
  const apiFeatures = new ApiFeatures(Room.find({ isAvailable: true }), req.query)
  .paginate(documentsCounts)
  .filter()
  .search(Room)
  .limitFields()
  .sort();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const documents = await mongooseQuery;

  res
  .status(200)
  .send({ results: documents.length, paginationResult, data: documents });

});

// get rooms available based with params : checkIn and checkOut and guests
async function CkeckAvailableRoom(req, res) {
  const { checkIn, checkOut, guests } = req.query;

  try {
    // Convert query parameters to Date objects for comparison
    const requestedCheckIn = new Date(checkIn);
    const requestedCheckOut = new Date(checkOut);

    // Log the converted dates to check if they are correct

    // Fetch all bookings and populate the room details
    const bookings = await Booking.find().populate("room");

    if (!bookings || bookings.length === 0) {
      return res.status(404).send({ message: "No bookings found" });
    }

    const availableRooms = [];

    bookings.forEach((booking) => {
      const bookingCheckIn = new Date(booking.Date_started);
      const bookingCheckOut = new Date(booking.Date_end);

      // Check if there is no overlap with the existing booking
      const noOverlap =
        requestedCheckOut <= bookingCheckIn ||
        requestedCheckIn >= bookingCheckOut;

      // If there is no overlap and the guests fit in the room, the room is available
      if (noOverlap && guests == booking?.room?.maxOccupancy) {
        availableRooms.push(booking);
      }
    });

    // If we found available rooms, return them
    if (availableRooms.length > 0) {
      res.status(200).send({
        message: "Available rooms found successfully",
        data: availableRooms,
      });
    } else {
      res.status(200).send({
        message: "No rooms available for the specified dates and guest count",
        data: [],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
}

async function FindOneRoom(req, res) {
  try {
    const room = await Room.findOne({ _id: req.params.id }).populate(
      "hotelName"
    );
    if (!room) {
      return res.status(404).send({ message: "room not found" });
    }
    res.status(200).send({ message: "Room Find with success", data: room });
  } catch (error) {
    console.log(error);
  }
}
async function CreateRoom(req, res) {
  try {
    const room = await Room.create(req.body);
    res.status(200).send({ message: "Room Find with success", data: room });
  } catch (error) {
    console.log(error);
  }
}
async function UpdateRoom(req, res) {
  const roomupdated = {
    name: req.body.name,
    description: req.body.description,
  };
  console.log(req.body);
  try {
    const room = await Room.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!room) {
      return res.status(404).send({ message: "room not found" });
    }
    res.status(200).send({ message: "Room updated with success", data: room });
  } catch (error) {
    console.log(error);
  }
}
async function DeleteRoom(req, res) {
  try {
    const room = await Room.findOneAndDelete({ _id: req.params.id });
    if (!room) {
      return res.status(404).send({ message: "room not found" });
    }
    res.status(200).send({ message: "Room deleted with success" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  FindAllRoom,
  FindOneRoom,
  CreateRoom,
  UpdateRoom,
  DeleteRoom,
  FindAvailableRoom,
  CkeckAvailableRoom,
};
