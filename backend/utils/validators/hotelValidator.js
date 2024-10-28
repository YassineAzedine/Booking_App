const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../midellwares/validation/validatorMiddleware');
const Hotel = require('../../model/hotel');

exports.getHotelValidator = [
  check('id').isMongoId().withMessage('Invalid hotel id format'),
  validatorMiddleware,
];

exports.createHotelValidator = [
  check('name')
    .notEmpty().withMessage('Hotel name is required')
    .isLength({ min: 3 }).withMessage('Hotel name is too short')
    .isLength({ max: 32 }).withMessage('Hotel name is too long')
    .custom(async (value) => {
      const hotel = await Hotel.findOne({ where: { name: value } });
      if (hotel) throw new Error('Hotel name must be unique');
    })
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];


exports.updateHotelValidator = [
  check('id').isMongoId().withMessage('Invalid hotel id format'),
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteHotelValidator = [
  check('id').isMongoId().withMessage('Invalid hotel id format'),
  validatorMiddleware,
];
