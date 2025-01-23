//  Import the express module
const express = require('express');
const authMiddleware = require('../middlewares/auth.miiddleware');
// Call the router method from express to create the router
const router = express.Router();
// Import the add service controller 
const serviceController = require('../controllers/service.controller');
// Create a route to handle the add service request on post
router.post("/api/service", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.addService); 
// Create a route to handle the get all services request on get
router.get("/api/services", [authMiddleware.verifyToken], serviceController.getservices);


module.exports = router