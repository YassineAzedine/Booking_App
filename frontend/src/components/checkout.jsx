import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Import useForm from react-hook-form
import api from '../Api/api.js';

function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState([]);
console.log("room" , room)
  // Initialize React Hook Form with default values and validation rules
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      Date_started: '',
      Date_end: '',
      paymentInfo: {
        creditCardNumber: '',
        expirationDate: '',
        cvv: '',
      },
    },
  });

  useEffect(() => {
    // Fetch room data from the API using Axios with the base URL
    api
      .get(`rooms/${id}`)
      .then((response) => setRoom(response.data.data))
      .catch((error) => console.error(error));
  }, [id]);

  // Submit handler with form validation
  const onSubmit = async (data) => {
    try {
      const response = await api.post('booking', {
        name: data.name,
        email: data.email,
        address: data.address,
        Date_started: data.Date_started,
        Date_end: data.Date_end,
        room: id,
        paymentInfo: {
          creditCardNumber: data.paymentInfo.creditCardNumber,
          expirationDate: data.paymentInfo.expirationDate,
          cvv: data.paymentInfo.cvv,
        },
      });

      if (response) {
        console.log('Booking successful');
        navigate('/confirm');
      } else {
        console.error('Error submitting booking');
      }
    } catch (error) {
      console.error('Request failed', error);
    }
  };

  return (
    <div>
      <section className="checkout py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 p-4">
              <div className="card border-0">
                <img
                  src="/img/hotel-2.jpg"
                  className="card-img-top"
                  alt="Room Image"
                />
                <div className="card-body px-0">
                  <h2 className="card-title ls-3">{room?.hotelName?.name}</h2>
                  <p className="card-text mb-0">Max Guests: {room.maxOccupancy}</p>
                  <p className="card-text mb-0">Bed Count: {room.bedCount}</p>
                  <p className="card-text mb-0">Price: $200.00/night</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-4">
              {/* Form for Booking */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    {...register('address', { required: 'Address is required' })}
                  />
                  {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Date_started" className="form-label">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="Date_started"
                        {...register('Date_started', { required: 'Check-in date is required' })}
                      />
                      {errors.Date_started && <p className="text-danger">{errors.Date_started.message}</p>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Date_end" className="form-label">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="Date_end"
                        {...register('Date_end', { required: 'Check-out date is required' })}
                      />
                      {errors.Date_end && <p className="text-danger">{errors.Date_end.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="creditCardNumber" className="form-label">
                        Credit Card Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="creditCardNumber"
                        {...register('paymentInfo.creditCardNumber', {
                          required: 'Credit Card Number is required',
                          pattern: {
                            value: /^\d{16}$/,
                            message: 'Invalid credit card number',
                          },
                        })}
                      />
                      {errors.paymentInfo?.creditCardNumber && (
                        <p className="text-danger">{errors.paymentInfo.creditCardNumber.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="expirationDate" className="form-label">
                        Expiration Date (MMYY)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="expirationDate"
                        {...register('paymentInfo.expirationDate', {
                          required: 'Expiration date is required',
                          pattern: {
                            value: /^\d{4}$/,
                            message: 'Invalid expiration date',
                          },
                        })}
                      />
                      {errors.paymentInfo?.expirationDate && (
                        <p className="text-danger">{errors.paymentInfo.expirationDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        {...register('paymentInfo.cvv', {
                          required: 'CVV is required',
                          pattern: {
                            value: /^\d{3,4}$/,
                            message: 'Invalid CVV',
                          },
                        })}
                      />
                      {errors.paymentInfo?.cvv && <p className="text-danger">{errors.paymentInfo.cvv.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-orange mt-4">
                    Complete Checkout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
