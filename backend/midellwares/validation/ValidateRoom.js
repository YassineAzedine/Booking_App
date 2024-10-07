// middleware/validateRoom.js
const Joi = require('joi');

// Define the room schema
const roomSchema = Joi.object({
  hotelName: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
  pricePerNight: Joi.number().positive().required(),
  bedCount: Joi.number().integer().min(1).required(),
  bathroomCount: Joi.number().integer().min(1).required(),
  maxOccupancy: Joi.number().integer().positive().required(),
});

// Middleware for validating room data
const validateRoom = (req, res, next) => {
  const { error, value } = roomSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.body = value; // Attach the validated value to the request
  next(); // Proceed to the next middleware or route handler
};

module.exports = validateRoom;
