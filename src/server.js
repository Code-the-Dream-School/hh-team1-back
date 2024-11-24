require('dotenv').config({ path: '../.env' });
const { PORT = 8000 } = process.env;
const app = require("./app");
const connectDB = require("./db/connect");


const listener = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

listener();