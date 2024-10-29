// Load environment variables
require("dotenv").config();

// Import core packages and middleware
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// Import custom middleware and routes
const globalError = require('./midellwares/errorMiddleware');
const dbConnection = require("./config/database");
const HotelRouter = require("./router/hotelRouter");
const RoomRouter = require("./router/roomRouter");
const AuthRouter = require("./router/authRouter");
const BookingRouter = require("./router/bookingRouter");

// Initialize Express app
const app = express();

// Connect to the database
dbConnection();

// Set up global middleware

// Enable CORS for all domains
app.use(cors());
app.options('*', cors());

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Limit repeated requests from the same IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after an hour'
});
app.use(limiter);

// Protect against HTTP Parameter Pollution attacks
app.use(hpp({
  whitelist: ['price', 'sold', 'quantity', 'ratingsAverage', 'ratingsQuantity']
}));

// Compress all responses
app.use(compression());

// Parse JSON request bodies with a limit
app.use(express.json({ limit: '20kb' }));

// Mount routes with limiter
app.use('/hotels', HotelRouter);
app.use('/rooms', RoomRouter);
app.use('/auth', AuthRouter);
app.use('/booking', BookingRouter);

// Global error handling middleware
app.use(globalError);

// Start server and listen on specified port
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Shutting down due to unhandled rejection...');
    process.exit(1);
  });
});
