import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://backend-booking-a4wu.onrender.com/', // Replace with your base URL
  //  baseURL : "https://booking-app-cp61.onrender.com/"
    baseURL : "http://localhost:5555/"

});

export default instance;