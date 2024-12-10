const express = require("express");
const { searchEvents } = require("../controllers/ticketmasterController");

const ticketmasterRouter = express.Router();

// Route definition with optional parameters marked with ?
ticketmasterRouter.get(
  "/events/:city/:stateCode/:startDateTime?/:endDateTime?",
  searchEvents
);

module.exports = ticketmasterRouter;

//The API endpoint will work with formats:
//   /api/events/Seattle/WA/2024-02-01/2024-02-05
//   /api/events/Seattle/WA/null/2024-02-01
//   /api/events/Seattle/WA//2024-02-01
//   /api/events/Seattle/WA
