const express = require("express");
const {
  CreateBooking,
  FindBooking,
  DeleteBooking,
} = require("../controller/bookingController");
const { protect}  = require('../controller/authController')
const { auth } = require("../midellwares/auth");
const BookingRouter = express.Router();
BookingRouter.post("/", protect, CreateBooking);
BookingRouter.get("/", FindBooking);
BookingRouter.delete("/:id", DeleteBooking);

module.exports = BookingRouter;
