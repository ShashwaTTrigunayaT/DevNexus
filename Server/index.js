require('dotenv').config(); // 1. MUST BE AT THE VERY TOP
const express = require('express');
const connectDB = require('./conf/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./Routes/userRoute');
const aiRoute = require('./Routes/aiRoute');
const executeRoutes = require('./Routes/execute');

// Import Routes and Middleware

const projectRoute = require('./Routes/projectRoute'); 
const { checkForAuth, isLoggedIn } = require('./middleware/auth');


const app = express();
const PORT = process.env.PORT || 5000; // Fallback port

// Connect to DB
connectDB();

// Standard Middleware
app.use(cors({
    origin: "http://localhost:5173", // Allow your React Frontend
    credentials: true // Allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Custom Middleware
// This function expects to return a middleware, make sure middleware/auth.js matches!
app.use(checkForAuth("token")); 

// Routes
app.use("/user", userRoute);
app.use("/project",projectRoute);
app.use("/ai",aiRoute);
app.use('/execute', executeRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});