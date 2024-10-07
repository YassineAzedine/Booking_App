const validateRooms = require("./../midellwares/validation/ValidateRoom")
const {auth} = require("./../midellwares/auth")
const { authorize} = require("./../midellwares/authrize")
const express = require("express")
const { FindAllRoom, FindOneRoom, UpdateRoom, DeleteRoom  ,CreateRoom, FindAvailableRoom , CkeckAvailableRoom} = require("../controller/roomControlleer")
const { Roles } = require("../interface/roles")
const RoomRouter = express.Router()
RoomRouter.get('/'  , FindAllRoom)
RoomRouter.get('/available'  , FindAvailableRoom)
RoomRouter.get('/ckeck-available'  , CkeckAvailableRoom)
RoomRouter.post('/'  ,validateRooms , auth , authorize([Roles.ADMIN]) , CreateRoom)
RoomRouter.get('/:id'  , FindOneRoom)
RoomRouter.put('/:id'  , UpdateRoom)
RoomRouter.delete('/:id'  , DeleteRoom)

module.exports  = RoomRouter
    