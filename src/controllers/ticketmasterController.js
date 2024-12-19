const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// API key from .env file
const apiKey = process.env.TICKETMASTER_API_KEY;

exports.searchEvents = async (req, res) => {
  const { city, stateCode } = req.params;
  const { dateRangeStart, dateRangeEnd } = req.query;

  // Validation: Only check for required fields
  if (!city || !stateCode) {
    return res.status(400).json({
      error: "City and stateCode are required parameters",
    });
  }

  // Build base URL with required parameters
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}&stateCode=${stateCode}`;

  // Add dates if provided, format with Z time
  if (dateRangeStart && dateRangeStart !== "null") {
    const formattedStart = `${dateRangeStart}T00:00:00Z`;
    url += `&startDateTime=${formattedStart}`;
  }
  if (dateRangeEnd && dateRangeEnd !== "null") {
    const formattedEnd = `${dateRangeEnd}T23:59:59Z`;
    url += `&endDateTime=${formattedEnd}`;
  }

  console.log(url);

  try {
    console.log(url);
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching events" + url });
  }
};
