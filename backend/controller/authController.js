const User = require("../model/user")
const bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler');

//@des    Signup
//@route  POST /auth/register
//@access Public
const Register = asyncHandler( async (req ,res) =>{
    const saltRound = 10


    //make user Object 
const newuser  = {
    name : req.body.name ,
    email : req.body.email ,
    password  : await bcrypt.hash(req.body.password,saltRound),
    role  : req.body.role
}    

    const userExiste = await User.findOne({email : req.body.email})

    if(userExiste){
    return res.status(404).send({message  : "user email already existe"})      
    //create user
    }
const user =  await User.create(newuser)
   // Genrate token
       const payload = {
        user_id : user._id
       }
   const token  = await jwt.sign(payload , process.env.JWT_SECRET_KEY , { expiresIn: '1h' })
 res.status(200).send({"message" : "User register success" , data : user , token})
})

//@des  Signin
//@route POST /auth/login
//@access Public
const Login = asyncHandler(async (req ,res) => {
    //find by email
    const saltRound = 10
     //find user if exist in table users
    const userExiste = await User.findOne({email : req.body.email})
    if(!userExiste){
        return res.status(404).json({message  : "user not found"})
    }
    
    //compare password if correct
    const match = await bcrypt.compare(req.body.password, userExiste.password)
    //check if email aready exist or password  
      if(!match || !userExiste ){
        return res.status(404).send({message : "email or password not correct "})
      }
      //create object user 
       const user = {
        id : userExiste._id ,
        name : userExiste.name ,
        email : userExiste.email,
        role : userExiste.role
       }
       //retrun user data with token genrer
      res.status(200).send({
        message : "login succesfuly",
         user ,
        token : await jwt.sign(user , process.env.JWT_SECRET_KEY ,process.env.JWT_EXPIRE_TIME )
      })
} )

async function Profil(req ,res){
 try{
const user =  await User.findOne({_id : req.user_id})
 res.status(200).send({"message" : "Hotels Find with success" ,   user})
 }catch(error){
     console.log(error)
 }

}
module.exports  = {
    Register,Login , Profil
}