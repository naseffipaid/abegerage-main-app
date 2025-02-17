// // Import the dotenv module and call the config method to load the environment variables
// require('dotenv').config();
// // Import the express module
// const express = require('express');
// // Create the webserver
// const app = express();
// //import sanitize module
// const sanitize = require('sanitize');
// // Import the CORS module
// const cors = require('cors');

// // Add the CORS middleware to the express application
// app.use(cors());

// const port = process.env.PORT ;
// // Import the routes
// const routes = require('./routes');

// // Add the express.json() middleware
// app.use(express.json());
//  // Add the sanitizer to the express middleware
// app.use(sanitize.middleware);


// // Add the routes to the application as middleware
// app.use(routes);
// // Start the webserver
// app.listen(port, () => {
//     console.log(`Server started on:${port}`);
// });
// // Export the webserver for use in the application 
// module.exports = app;

// Import the dotenv module and call the config method to load the environment variables
require('dotenv').config();

// Import the express module
const express = require('express');

// Import the https module for HTTPS
const https = require('https');

// Import the fs module to read SSL certificate files
const fs = require('fs');

// Create the webserver
const app = express();

// Import sanitize module
const sanitize = require('sanitize');

// Import the CORS module
const cors = require('cors');

// Add the CORS middleware to the express application
app.use(cors());

// Define the port (use 5200 as specified in your .env file)
const port = process.env.PORT || 5200;

// Import the routes
const routes = require('./routes');

// Add the express.json() middleware
app.use(express.json());

// Add the sanitizer to the express middleware
app.use(sanitize.middleware);

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});
// Add the routes to the application as middleware
app.use(routes);


// Load SSL certificate and key
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/abegerages.uk/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/abegerages.uk/fullchain.pem'),
};

// Create HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS server started on port ${port}`);
});

// Export the webserver for use in the application
module.exports = app;