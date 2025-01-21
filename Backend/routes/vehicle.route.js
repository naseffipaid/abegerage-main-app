//  Import the express module
const express = require('express');
const authMiddleware = require('../middlewares/auth.miiddleware');
// Call the router method from express to create the router
const router = express.Router();
// Import the add employee controller 
const vehicleController = require('../controllers/vehicle.controller');
// Create a route to handle the add employee request on post
router.post("/api/vehicle", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.addVehicle); 




// Export the router
module.exports = router;
