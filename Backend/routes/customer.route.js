// Import the express module
const express = require('express');
const authMiddleware = require('../middlewares/auth.miiddleware');
// Call the router method from express to create the router
const router = express.Router();
// Import the add employee controller 
const customerController = require('../controllers/customer.controller');
// Create a route to handle the add customer request on post
router.post("/api/customer", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.createCustomer); 
// Create a route to handle the get all employees request on get
router.get("/api/customers", [authMiddleware.verifyToken], customerController.getAllCustomers);
//create a route to get a single customer
router.get("/api/customer/:id", [authMiddleware.verifyToken,], customerController.getsingleCustomer);
//create a route to update a single customer
router.put("/api/customer/:customerId", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.updateCustomer);
//create a route to delete a single customer
router.delete("/api/customer/:customerId", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.deleteCustomer);





// Export the router
module.exports = router;
