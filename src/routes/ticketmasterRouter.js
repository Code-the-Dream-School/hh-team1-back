const express = require("express");
const { searchEvents } = require("../controllers/ticketmasterController");

const ticketmasterRouter = express.Router();

// Route definition with optional parameters marked with ?
ticketmasterRouter.get(
  "/events/:city/:stateCode/:dateRangeStart?/:dateRangeEnd?",
  searchEvents
);

module.exports = ticketmasterRouter;

//The API endpoint will work with formats:
//   /api/ticketmaster/events/Seattle/WA?startDateTime=2024-02-01&endDateTime=2024-02-05
//   /api/ticketmaster/events/Seattle/WA?endDateTime=2024-02-01
//   /api/ticketmaster/events/Seattle/WA
