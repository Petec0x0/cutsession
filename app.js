const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
// parse requests of content-type - application/json
app.use(express.json());

// Database connection
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;
mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', (err) => {
    console.log("PLEASE MAKE SURE YOU'RE CONNECTED TO THE INTERNET (DATABASE IS ON A REMOTE SERVER)")
    console.log(err);
})
db.once('open', () => {
    console.log('Database connection established');
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});