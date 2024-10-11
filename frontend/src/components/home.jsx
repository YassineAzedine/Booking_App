import React, { useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import moment from 'moment';
import Reservation from './reservation';

function Home() {
  const [checkIn, setCheckIn] = useState(moment().format('YYYY-MM-DD'));
  const [checkOut, setCheckOut] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
  const [guest, setGuest] = useState(1);
  const [isClicked, setIsClicked] = useState(false); // New state to handle the click
  const [reservationData, setReservationData] = useState(null); 
console.log("env" ,  process.env.REACT_APP_BASE_URL_DEV)
  const onChangeCheckIn = (e) => setCheckIn(e.target.value);
  const onChangeCheckOut = (e) => setCheckOut(e.target.value);
  const onChangeGuest = (e) => setGuest(e.target.value);

  const handleClick = () => {
    // Set the data to trigger rendering Reservation with new values
    setReservationData({
      checkIn,
      checkOut,
      guest,
    });
  };

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="availability mt-4">
            <form>
              <div className="card shadow border-0 rounded-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 p-4 m-auto">
                      <p>Check in</p>
                      <input
                        type="date"
                        className="form-control border-0 p-0"
                        value={checkIn}
                        onChange={onChangeCheckIn}
                      />
                    </div>
                    <div className="col-md-3 p-4 m-auto">
                      <p>Check Out</p>
                      <input
                        type="date"
                        className="form-control border-0 p-0"
                        value={checkOut}
                        onChange={onChangeCheckOut}
                      />
                    </div>
                    <div className="col-md-3 p-4 m-auto">
                      <p>Guests</p>
                      <input
                        type="number"
                        className="form-control border-0 p-0"
                        value={guest}
                        onChange={onChangeGuest}
                        min="1"
                      />
                    </div>
                    <div className="col-md-3 p-4 m-auto">
                      <button
                        className="btn btn-orange rounded-0 w-100"
                        type="button"
                        onClick={handleClick}
                      >
                        VÉRIFIER LA DISPONIBILITÉ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div style={{"minHeight" : "300px"}}>
      
   
      {/* Conditionally render Reservation component */}
      {reservationData && (
        <Reservation
          checkIn={reservationData.checkIn}
          checkOut={reservationData.checkOut}
          guest={reservationData.guest}
        />
      )}
    </div>
    </div>
  );
}

export default Home;
