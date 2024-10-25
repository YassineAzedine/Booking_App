const Hotel = require("../model/hotel");
const ApiFeatures = require("../utils/apiFeatures");
const asyncHandler = require('express-async-handler');

//@des Get List Of Hotels
//@route GET /category
//@access Public
const FindAllHotel = asyncHandler(async (req, res) => {
    console.log(req.query);  // Logs the query parameters
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentsCounts = await Hotel.countDocuments();
    
    const apiFeature = new ApiFeatures(Hotel.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search() // Pass model name if needed for specific fields
      .limitFields()
      .sort();
  
    const { mongooseQuery, paginationResult } = apiFeature;
    const documents = await mongooseQuery;
  
    res.status(200).send({
      message: "Hotels found successfully",
      paginationResult,
      data: documents,
    });
  });
  
//@des get One hotel
//@route GET /hotel
//@access Public
async function FindOneHotel(req, res) {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id });
    if (!hotel) {
      return res.status(404).send({ message: "hotel not found" });
    }
    w;
    res.status(200).send({ message: "Hotel Find with success", data: hotel });
  } catch (error) {
    console.log(error);
  }
}
//@desc create new hotel
//@route POST /hotel
//@access Private
async function CreateHotel(req, res) {
  console.log(req.body);

  try {
    const hotel = await Hotel.create(req.body);
    res.status(200).send({ message: "Hotel Find with success", data: hotel });
  } catch (error) {
    console.log(error);
  }
}
//@des update hotel
//@route PUT /hotel
//@access private
async function UpdateHotel(req, res) {
  const hotelupdated = {
    name: req.body.name,
    description: req.body.description,
  };
  try {
    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.id },
      hotelupdated
    );
    if (!hotel) {
      return res.status(404).send({ message: "hotel not found" });
    }
    res
      .status(200)
      .send({ message: "Hotel updated with success", data: hotel });
  } catch (error) {
    console.log(error);
  }
}
//@desc delete hotel
//@route DELETE /category
//@access Private
async function DeleteHotel(req, res) {
  try {
    await Hotel.findOneAndDelete({ _id: req.params.id });
    const hotel = res
      .status(200)
      .send({ message: "Hotel deleted with success" });
    if (!hotel) {
      return res.status(404).send({ message: "hotel not found" });
    }
  } catch (error) {
    console.log(error);
  }
}
//export modules
module.exports = {
  FindAllHotel,
  FindOneHotel,
  CreateHotel,
  UpdateHotel,
  DeleteHotel,
};
