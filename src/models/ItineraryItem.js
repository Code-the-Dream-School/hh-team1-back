
// copy the code from approved pull request
const mongoose = require("mongoose");

const ItineraryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Error: no name provided for itinerary item."],
      maxlength: 25,
    },
    date: {
      type: Date,
      required: [true, "Error: no date provided for itinerary item."],
    },
    location: {
      address: {
        type: String,
        required: [true, "Error: no address provided for itinerary item."],
      },
      city: {
        type: String,
        required: [true, "Error: no city provided for itinerary item."],
      },
      state: {
        type: String,
        required: [true, "Error: no state provided for itinerary item."],
      },
      postalCode: {
        type: String,
        required: [true, "Error: no zipcode provided for itinerary item."],
      },
      coordinates: {
        lat: {
          type: Number,
          required: [true, "Error: no latitude provided for location."],
        },
        lng: {
          type: Number,
          required: [true, "Error: no longitude provided for location."],
        },
      },
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ItineraryItem", ItineraryItemSchema);