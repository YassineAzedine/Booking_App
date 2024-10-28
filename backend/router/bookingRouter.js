const express = require("express")
const {CreateBooking , FindBooking , DeleteBooking} = require("../controller/bookingController")
const { auth } = require("../midellwares/auth")
const BookingRouter = express.Router()
BookingRouter.post('/'     ,CreateBooking)
BookingRouter.get('/'     ,FindBooking)
BookingRouter.delete('/:id'     ,DeleteBooking)




module.exports  = BookingRouter
    