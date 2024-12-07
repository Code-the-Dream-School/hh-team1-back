const axios = require("axios");

const apiKey = process.env.TICKETMASTER_API_KEY;

exports.searchEvents = async (req, res) => {
  const { city, stateCode, startDateTime, endDateTime } = req.params;

  // Validation: Only check for required fields
  if (!city || !stateCode) {
    return res.status(400).json({
      error: "City and stateCode are required parameters",
    });
  }

  // Build base URL with required parameters
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}&stateCode=${stateCode}`;
  
  // Add dates if provided, format with Z time
  if (startDateTime) {
    const formattedStart = `${startDateTime}T00:00:00Z`;
    url += `&startDateTime=${formattedStart}`;
  }
  if (endDateTime) {
    const formattedEnd = `${endDateTime}T00:00:00Z`;
    url += `&endDateTime=${formattedEnd}`;
  }

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching events" });
  }
};