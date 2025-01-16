// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the install router 
const installRouter = require('./install.route');
//import employee router
const employeeRouter = require('./employee.route');
// Import the login router
const loginRouter = require('./login.route');


// Add the install router to the main router 
router.use(installRouter);
// Add the employee router to the main router
router.use(employeeRouter);
// Add the login router to the main router
router.use(loginRouter);







// Export the router for use in the application
module.exports = router;