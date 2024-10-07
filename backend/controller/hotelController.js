const Hotel = require("../model/hotel")

async function FindAllHotel(req ,res){
 try{
const hotels =  await Hotel.find()
 res.status(200).send({"message" : "Hotels Find with success" , data : hotels})
 }catch(error){
     console.log(error)
 }

}
async function FindOneHotel(req ,res){
    try{
       const hotel =  await Hotel.findOne({_id : req.params.id})
   if(!hotel){
    return res.status(404).send({"message" : "hotel not found" })
   }w
   res.status(200).send({"message" : "Hotel Find with success" , data : hotel})
       
    }catch(error){
        console.log(error)
    }
}
async function CreateHotel(req ,res){
           console.log(req.body);
     
           
    try{
       const hotel =  await  Hotel.create(req.body)
   res.status(200).send({"message" : "Hotel Find with success" , data : hotel})

    }catch(error){
        console.log(error)
    }
}
async function UpdateHotel(req ,res){
    const hotelupdated = {
        name : req.body.name , 
        description : req.body.description
       }
    try{
        const hotel =  await  Hotel.findOneAndUpdate({_id : req.params.id},hotelupdated)
        if(!hotel){
            return res.status(404).send({"message" : "hotel not found" })
           }
           res.status(200).send({"message" : "Hotel updated with success" , data : hotel})
           
    }catch(error){
        console.log(error)
    }
}
async function DeleteHotel(req ,res){
    try{
 await  Hotel.findOneAndDelete({_id : req.params.id})
 const hotel = res.status(200).send({"message" : "Hotel deleted with success" })
 if(!hotel){
    return res.status(404).send({"message" : "hotel not found" })
   }
    }catch(error){
        console.log(error)
    }
}

module.exports  = {
    FindAllHotel , FindOneHotel , CreateHotel , UpdateHotel , DeleteHotel    
}