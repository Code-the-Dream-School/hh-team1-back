require("dotenv").config(); // Make sure this is at the top

const express = require("express");
const app = express();

const cors = require('cors')
const favicon = require('express-favicon');
const logger = require('morgan');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const notFoundMiddleware = require('./middleware/not_found');
const errorHandleMiddleware = require('./middleware/error_handler');


const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/user');
const itineraryRouter = require('./routes/itineraryRouter');
const ticketmasterRouter = require("./routes/ticketmasterRouter.js");


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(helmet());
app.use(mongoSanitize());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
});



// routes
app.use("/api", apiLimiter);
app.use('/api/v1', mainRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/itinerary', itineraryRouter);
app.use("/api/v1/ticketmaster", ticketmasterRouter);

// error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);


module.exports = app;
