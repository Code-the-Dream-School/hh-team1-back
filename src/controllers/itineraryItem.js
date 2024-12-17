const ItineraryItem = require("../models/ItineraryItem");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/bad_request");
const { NotFoundError } = require("../errors/not_found");
const { default: mongoose } = require("mongoose");

const getAllItineraryItems = async (req, res) => {
  const itineraryItems = await ItineraryItem.find({
    createdBy: req.userId,
  }).sort("createdAt");
  res
    .status(StatusCodes.OK)
    .json({ itineraryItems, count: itineraryItems.length });
};

const getSingleItineraryItem = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user.userId;

  console.log("User:", userId);
  console.log("Itinerary Id:", id);

  const itineraryItem = await ItineraryItem.findOne({
    _id: id,
    createdBy: userId,
  });
  if (!itineraryItem) {
    throw new NotFoundError(`No itineraryItem with id ${id} for use ${userId}`);
  }
  res.status(StatusCodes.OK).json({ itineraryItem });
};

const validateNestedFields = (requiredFields, data, prefix = "") => {
  const missingFields = [];
  for (const field of requiredFields) {
    const fieldName = prefix ? `${prefix}.${field}` : field;
    if (!data[field]) {
      missingFields.push(fieldName);
    }
  }
  return missingFields;
};

const createItineraryItem = async (req, res) => {
  req.body.createdBy = req.user;

  const locationRequiredFields = ["address", "city", "state", "postalCode"];
  const coordinatesRequiredFields = ["lat", "lng"];

  const missingLocationFields = validateNestedFields(
    locationRequiredFields,
    req.body.location || {},
    "location"
  );
  const missingCoordinatesRequiredFields = validateNestedFields(
    coordinatesRequiredFields,
    req.body.location?.coordinates || {},
    "location.coordinates"
  );

  const missingFields = [
    ...missingLocationFields,
    ...missingCoordinatesRequiredFields,
  ];

  if (missingFields.length > 0) {
    throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
  }

  const itineraryItem = await ItineraryItem.create(req.body);
  res.status(StatusCodes.CREATED).json({ itineraryItem });
};

const updateItineraryItem = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const updates = req.body;

  const locationRequiredFields = ["address", "city", "state", "postalCode"];
  const coordinatesRequiredFields = ["lat", "lng"];

  const missingLocationFields = validateNestedFields(
    locationRequiredFields,
    updates.location || {},
    "location"
  );
  const missingCoordinatesRequiredFields = validateNestedFields(
    coordinatesRequiredFields,
    updates.location?.coordinates || {},
    "location.coordinates"
  );

  const missingFields = [
    ...missingLocationFields,
    ...missingCoordinatesRequiredFields,
  ];

  if (missingFields.length > 0) {
    throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
  }

  const itineraryItem = await ItineraryItem.findOneAndUpdate(
    { _id: id },
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!itineraryItem) {
    throw new NotFoundError(`No itinerary item found with id: ${id}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ itineraryItem, message: "Itinerary item updated successfully." });
};

const deleteItineraryItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid ID format: ${id}`);
  }

  const objectId = new mongoose.Types.ObjectId(id);
  const itineraryItem = await ItineraryItem.findOneAndDelete({
    _id: objectId,
    createdBy: req.userId,
  });

  if (!itineraryItem) {
    throw new NotFoundError(`No itinerary item found with id: ${id}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Itinerary item deleted successfully." });
};

module.exports = {
  getAllItineraryItems,
  getSingleItineraryItem,
  createItineraryItem,
  updateItineraryItem,
  deleteItineraryItem,
};
