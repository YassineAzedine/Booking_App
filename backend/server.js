const express = require("express")
const HotelRouter = require("./router/hotelRouter")
const RoomRouter = require("./router/roomRouter")
const AuthRouter = require("./router/authRouter")
const BookingRouter = require("./router/bookingRouter")
const cors  = require("cors")
const morgan = require('morgan')
const globalError = require('./midellwares/errorMiddleware');
const compression = require('compression');
const dbConnection = require("./config/database")
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

require("dotenv").config()

const app = express()

// Enable other domains to access your application
app.use(cors());
app.options('*', cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan())
    console.log(`mode: ${process.env.NODE_ENV}`);
  }
  // Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message:
      'Too many accounts created from this IP, please try again after an hour',
  });
  // Middleware to protect against HTTP Parameter Pollution attacks
app.use(
    hpp({
      whitelist: [
        'price',
        'sold',
        'quantity',
        'ratingsAverage',
        'ratingsQuantity',
      ],
    })
  );
  
//Middlewares
app.use(express.json({ limit: '20kb' }));
// compress all responses
app.use(compression());
//Global error handling middleware for express
app.use(globalError);
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
// Connect with db
dbConnection()
app.use(express.json()) 
app.use('/hotels' ,limiter, HotelRouter) 
app.use('/rooms' ,limiter, RoomRouter) 
app.use('/auth' , limiter,AuthRouter)
app.use('/booking' , limiter,BookingRouter) 

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
      console.error(`Shutting down....`);
      process.exit(1);
    });
  });
  