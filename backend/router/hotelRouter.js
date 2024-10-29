const express = require("express")
const { FindAllHotel, FindOneHotel, UpdateHotel, DeleteHotel  ,CreateHotel ,uploadBrandImage , resizeImage} = require("../controller/hotelController")
const {
    getHotelValidator,
    createHotelValidator,
    updateHotelValidator,
    deleteHotelValidator,

  } = require('../utils/validators/hotelValidator');
const { protect, allowedTo } = require("../controller/authController");
const HotelRouter = express.Router()
HotelRouter.get('/'   , FindAllHotel)
HotelRouter.post('/' , protect,allowedTo('admin'), uploadBrandImage,resizeImage,createHotelValidator ,  CreateHotel)
HotelRouter.get('/:id'  ,getHotelValidator, FindOneHotel)
HotelRouter.put('/:id'  ,updateHotelValidator, UpdateHotel)
HotelRouter.delete('/:id'  ,deleteHotelValidator, DeleteHotel)

module.exports  = HotelRouter
