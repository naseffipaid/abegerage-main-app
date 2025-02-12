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
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
};
// Add the CORS middleware to the express application
app.use(cors(corsOptions));
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