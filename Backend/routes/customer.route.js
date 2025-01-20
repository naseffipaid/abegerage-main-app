// Import the express module
const express = require('express');
const authMiddleware = require('../middlewares/auth.miiddleware');
// Call the router method from express to create the router
const router = express.Router();
// Import the add employee controller 
const customerController = require('../controllers/customer.controller');
// Create a route to handle the add employee request on post
router.post("/api/customer", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.createCustomer); 
// Create a route to handle the get all employees request on get
router.get("/api/customers", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.getAllCustomers);





// Export the router
module.exports = router;
