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
//   /api/v1/ticketmaster/events/Seattle/WA/2024-02-01/2024-02-05
//   /api/v1/ticketmaster/events/Seattle/WA/null/2024-02-01
//   /api/v1/ticketmaster/events/Seattle/WA//2024-02-01
//   /api/v1/ticketmaster/events/Seattle/WA
