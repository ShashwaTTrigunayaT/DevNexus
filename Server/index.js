const express = require('express');
const connectDB = require('./conf/db');
const cors = require('cors');
const auth = require('./Routes/auth');
require('dotenv').config();
const app = express();

app.use(cors());

// Connect to DB
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define Routes
app.use("/auth", auth);

// Start the server



app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});