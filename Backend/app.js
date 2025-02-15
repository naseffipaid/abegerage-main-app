// Import the dotenv module and call the config method to load the environment variables
require('dotenv').config();
// Import the express module
const express = require('express');
// Create the webserver
const app = express();
//import sanitize module
const sanitize = require('sanitize');
// Import the CORS module
const cors = require('cors');
// Set up the CORS options to allow requests from our front-end
// const corsOptions = {
//     origin: ['http://localhost:5173', 'http://16.16.91.108:5173'],  // Add both localhost and your server's frontend IP
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,  // Allow credentials (cookies, etc.) if needed
//     preflightContinue: false, // CORS preflight request handling
//   };
// const corsOptions = {
//     origin: '*',  // Allow all origins
//     methods: 'GET,POST,PUT,DELETE',  // Allow these methods
//     allowedHeaders: 'Content-Type',  // Allow these headers
//   };
  

// Add the CORS middleware to the express application
app.use(cors());
// app.use((req, res, next) => {
//     console.log("Request Origin:", req.headers.origin); // Log the origin
//     console.log("Request Headers:", req.headers); // Log all headers
//     next();
//   });
// Create a variable to hold our port number
const port = process.env.PORT ;
// Import the routes
const routes = require('./routes');

// Add the express.json() middleware
app.use(express.json());
 // Add the sanitizer to the express middleware
app.use(sanitize.middleware);


// Add the routes to the application as middleware
app.use(routes);
// Start the webserver
app.listen(port, () => {
    console.log(`Server started on http://16.16.91.108:${port}`);
});
// Export the webserver for use in the application 
module.exports = app;