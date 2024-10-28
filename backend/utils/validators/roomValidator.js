const slugify = require('slugify');
const { check, body } = require('express-validator');

const validatorMiddleware = require('../../midellwares/validation/validatorMiddleware');
const Room = require('../../model/room');

exports.getRoomValidator = [
  check('id').isMongoId().withMessage('Invalid room id format'),
  validatorMiddleware,
];
exports.createRoomValidator = [
  check('hotelName')
    .isString().withMessage('Hotel name must be a string')
    .notEmpty().withMessage('Hotel name is required'),

  check('imageCover')
    .isURL().withMessage('imageCover must be a valid URL')
    .notEmpty().withMessage('imageCover is required'),

  check('images')
    .isArray().withMessage('images must be an array')
    .custom((images) => images.every(img => typeof img === 'string' && img.startsWith('http')))
    .withMessage('Each image in images must be a valid URL'),

  check('pricePerNight')
    .isFloat({ gt: 0 }).withMessage('pricePerNight must be a positive number'),

  check('bedCount')
    .isInt({ min: 1 }).withMessage('bedCount must be an integer and at least 1'),

  check('bathroomCount')
    .isInt({ min: 1 }).withMessage('bathroomCount must be an integer and at least 1'),

  check('maxOccupancy')
    .isInt({ min: 1 }).withMessage('maxOccupancy must be an integer and at least 1'),

  check('isAvailable')
    .isBoolean().withMessage('isAvailable must be a boolean'),

  check('ratingsAverage')
    .isFloat({ min: 1, max: 5 }).withMessage('ratingsAverage must be between 1 and 5'),

  check('ratingsQuantity')
    .isInt({ min: 0 }).withMessage('ratingsQuantity must be a non-negative integer'),

  check('title')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 50 }).withMessage('Title must be between 3 and 50 characters'),
    validatorMiddleware 
];

exports.updateRoomValidator = [
  check('id').isMongoId().withMessage('Invalid Room id format'),
  body('title')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteRoomValidator = [
  check('id').isMongoId().withMessage('Invalid Room id format'),
  validatorMiddleware,
];
