const express = require("express")
const { Register, Login  , Profil, forgotPassword, verifyPassResetCode, resetPassword } = require("../controller/authController")
const {auth} = require("../midellwares/auth")
const { signupValidator , loginValidator } = require("../utils/validators/authValidator")
const AuthRouter = express.Router()
AuthRouter.post('/register' , signupValidator  , Register)
AuthRouter.post('/login'  ,  loginValidator , Login)
AuthRouter.post('/profil'  , auth ,  Profil)
AuthRouter.post('/forgotPassword', forgotPassword);
AuthRouter.post('/verifyResetCode', verifyPassResetCode);
AuthRouter.put('/resetPassword', resetPassword);


module.exports  = AuthRouter
