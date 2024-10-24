const express = require("express")
const { Register, Login  , Profil } = require("../controller/authController")
const {auth} = require("../midellwares/auth")
const { signupValidator , loginValidator } = require("../utils/validators/authValidator")
const AuthRouter = express.Router()
AuthRouter.post('/register' , signupValidator  , Register)
AuthRouter.post('/login'  ,  loginValidator , Login)
AuthRouter.post('/profil'  , auth ,  Profil)



module.exports  = AuthRouter
