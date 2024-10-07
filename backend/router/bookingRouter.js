const express = require("express")
const {CreateBooking , FindBooking} = require("../controller/bookingController")
const { auth } = require("../midellwares/auth")
const BookingRouter = express.Router()
BookingRouter.post('/'     ,CreateBooking)
BookingRouter.get('/'     ,FindBooking)



module.exports  = BookingRouter
    