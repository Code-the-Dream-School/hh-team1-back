const express = require("express");
const { searchEvents } = require("../controllers/ticketmasterController");

const ticketmasterRouter = express.Router();

// Route definition with optional parameters marked with ?
ticketmasterRouter.get("/events/:city/:stateCode", searchEvents);

module.exports = ticketmasterRouter;

//The API endpoint will work with formats:
//   /api/ticketmaster/events/Seattle/WA?dateRangeStart=2025-02-01&dateRangeEnd=2025-02-05
//   /api/ticketmaster/events/Seattle/WA?dateRangeStart=2025-02-01
//   /api/ticketmaster/events/Seattle/WA
