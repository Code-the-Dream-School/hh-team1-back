const mongoose = require('mongoose')
require('dotenv').config();

 
const connectDB = (url) => {
    if (!url) {
        throw new Error("Database connection string is undefined. Check your environment variables.");
    }
    return mongoose.connect(url, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    .then(() => {
        console.log("Connected to the DB ...");
    })
    .catch((err) => {
        console.error("Database connection Error: ", err);
        process.exit(1); // Exit process on connection failure
    })
}

module.exports = connectDB;