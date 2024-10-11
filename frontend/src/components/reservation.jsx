import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../Api/api.js';

function Reservation({checkIn , checkOut , guest }) {
  console.log("checkIn" ,checkIn)
  console.log("checkOut" ,checkOut)
  console.log("guest" ,guest)


  const [ availableRooms , setAvailabeRooms] = useState([])
  const [ isloading , setLoading] = useState(false)
  const [ isErrorAvailableRooms , setErrorAvailableRooms] = useState("")

  
  console.log("isErrorAvailableRooms" , isErrorAvailableRooms)

 async function CheckAvailableRome(){
   try{
    setLoading(true)
    setErrorAvailableRooms("")
    setAvailabeRooms([])
    const availableRooms =  await  api.get(`rooms/ckeck-available?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guest}`)
       const roomsAv =  availableRooms.data.data

       if(roomsAv.length == 0){ 
    

         setErrorAvailableRooms("Not available Room")
         setAvailabeRooms([])

       
       }else{
         setLoading(false)
         setAvailabeRooms(roomsAv)
         setErrorAvailableRooms("")

       }
       setLoading(false)


  } catch(error){
     console.log(error)
  }
  }
  useEffect(() => {
    CheckAvailableRome();
  }, [checkIn, checkOut, guest]);

  return (
    <div>
      <section className="reservation py-5">
    <div className="container">
      <div className="text-center">
        <h3 className="">
          <Link to ="reservation" className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
            Reservation
          </Link>
        </h3>
        <h5>  </h5>
      </div>
      {/* hotel list */}
      {/* //Loading */}
      {isloading &&  (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '10vh' }}>
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)}
      {isErrorAvailableRooms && (
  <div class="alert alert-danger" role="alert">
{isErrorAvailableRooms}
</div>
)}
      {
        availableRooms && availableRooms.map((availaberoom)=>{
           return (
            <div className="card bg-white rounded overflow-hidden mt-5">
            <div className="row">
              <div className="col-md-2 p-0">
                <img src="img/1.jpg" className="img-fluid h-100 w-100" alt="" />
              </div>
              <div className="col-md-6 p-3 m-auto">
                <h3>availaberoom</h3>
                <p className="text-warning">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                 <Link href="" className="text-primary text-decoration-none">
                    (5 Reviews)
                 </Link>
                </p>
                <div className="d-flex mb-2 justify-content-start align-items-center hotel-icons text-muted">
                  <span className="d-inline-block me-3">
                    <i className="fa fa-bed" /> {availaberoom.room.bathroom}
                  </span>
                  <span className="d-inline-block me-3">
                    <i className="fa fa-toilet" /> 1
                  </span>
                  <span className="d-inline-block me-3">
                    <i className="fa fa-users" /> 6
                  </span>
                </div>
                <p className="mb-0">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
                  facilis, iusto reiciendis amet suscipit placeat mollitia ad quia.
                </p>
              </div>
              <div className="col-md-3 text-end offset-md-1 p-3 m-auto">
                <p>
                  starting from <span className="fw-bold text-success">$100</span>
                </p>
               <Link to = {`rooms/checkout/${availaberoom._id}`} href="checkout.html" className="btn btn-success rounded-0">
                  Select Room
               </Link>
              </div>
            </div>
          </div>
           )
        })
      }
     
      
      {/* hotel list */}
    </div>
  </section>
  </div>
  )
}

export default Reservation