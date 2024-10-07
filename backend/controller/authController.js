const User = require("../model/user")
const bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken")
async function Register(req ,res){


    const saltRound = 10
const newuser  = {
    name : req.body.name ,
    email : req.body.email ,
    password  : await bcrypt.hash(req.body.password,saltRound),
    role  : req.body.role
}    
 try{
    const userExiste = await User.findOne({email : req.body.email})

    if(userExiste){
    return res.status(404).send({message  : "user email already existe"})      
    }
const user =  await User.create(newuser)
 res.status(200).send({"message" : "User register success" ,  user})
 }catch(error){
     console.log(error)
 }

}
async function Login(req ,res){
    const scretjwt = "hello"

  
    
 try{
    //find by email
    const saltRound = 10
    const hashpassowrd =  await bcrypt.hash(req.body.password , saltRound)
      const userExiste = await User.findOne({email : req.body.email})


      if (!userExiste){
        return res.status(404).send({message : "user not found"})
      }
      const match = await bcrypt.compare(req.body.password, userExiste.password)

      if(!match ){

        return res.status(404).send({message : "email or password not correct "})
      }
      
       const user = {
        id : userExiste._id ,
        name : userExiste.name ,
        email : userExiste.email,
        role : userExiste.role

       }

      res.status(200).send({
        message : "login succesfuly",
         user ,
        token : await jwt.sign(user , scretjwt , { expiresIn: '1h' })
      })

     //find by password


 }catch(error){
     console.log(error)
 }

}
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