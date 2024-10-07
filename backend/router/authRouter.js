const express = require("express")
const { Register, Login  , Profil } = require("../controller/authController")
const {auth} = require("../midellwares/auth")


const AuthRouter = express.Router()
AuthRouter.post('/register'  , Register)
AuthRouter.post('/login'  , Login)
AuthRouter.post('/profil'  , auth ,  Profil)



module.exports  = AuthRouter
