require("dotenv").config(); 
const express = require("express");
const app = express();

const cors = require("cors");
const logger = require('morgan');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const { doubleCsrf } = require("csrf-csrf");
const notFoundMiddleware = require('./middleware/not_found');
const errorHandleMiddleware = require('./middleware/error_handler');

const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/user');
const itineraryRouter = require('./routes/itineraryRouter');
const ticketmasterRouter = require("./routes/ticketmasterRouter.js");

// Initialize CSRF protection
const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => "your-secret-key-min-32-chars-long",
  cookieName: "x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  },
  size: 64,
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(mongoSanitize());

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
});
app.use("/api/v1", apiLimiter);

// CSRF Token Middleware
app.use((req, res, next) => {
  res.cookie("x-csrf-token", generateToken(req, res));
  next();
});

// Routes
app.use('/api/v1', doubleCsrfProtection, mainRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/itinerary', itineraryRouter);
app.use("/api/v1/ticketmaster", ticketmasterRouter);

// Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

module.exports = app;
