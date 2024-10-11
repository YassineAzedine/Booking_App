import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import api from '../Api/api.js';
function Rooms() {
  const [rooms, setRooms] = useState([]);
console.log("rooms" , rooms)
  useEffect(() => {
    // Fetch user data from the API using Axios with the base URL
    api.get('rooms/available')
      .then(response => setRooms(response.data.data))
      .catch(error => console.error(error));
  }, []);
  return (
    <div><section className="gallery py-5">
    <div className="container">
      <h3 className="text-center mb-4">
        <Link className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
          Available Rooms
        </Link>
      </h3>
      <div className="gallery-grid">
        {
          rooms && rooms.map((room)=>{
            return (
              <>
        <div className="img-holder position-relative overflow-hidden">
          <img src={room?.imageUrl} className="img-fluid w-100" alt="" />
          <div className="info">
            <h3>
              <Link href="#" className="text-decoration-none text-white">
                {room?.hotelName?.name}
              </Link>
            </h3>
            <p className="text-white">${room.pricePerNight}/Night</p>
            <div className="d-flex mb-2 justify-content-start align-items-center hotel-icons text-white">
              <span className="d-inline-block me-3">
                <i className="fa fa-bed" /> {room.bedCount}
              </span>
              <span className="d-inline-block me-3">
                <i className="fa fa-toilet" /> {room.bathroomCount}
              </span>
              <span className="d-inline-block me-3">
                <i className="fa fa-users" />  {room.maxOccupancy}
              </span>
            </div>
            <Link to ={`checkout/${room._id}`}  className="btn btn-light btn-sm mt-4">
              Book Now
            </Link>
          </div>
        </div>      
              
              </>
            )
          })
        }
        
     
      </div>
    </div>
  </section>
  </div>
  )
}

export default Rooms