const express = require("express")
const { FindAllHotel, FindOneHotel, UpdateHotel, DeleteHotel  ,CreateHotel} = require("../controller/hotelController")
const HotelRouter = express.Router()
HotelRouter.get('/'  , FindAllHotel)
HotelRouter.post('/'  , CreateHotel)
HotelRouter.get('/:id'  , FindOneHotel)
HotelRouter.put('/:id'  , UpdateHotel)
HotelRouter.delete('/:id'  , DeleteHotel)

module.exports  = HotelRouter
