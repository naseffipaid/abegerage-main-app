//  Import the express module
const express = require('express');
const authMiddleware = require('../middlewares/auth.miiddleware');
// Call the router method from express to create the router
const router = express.Router();
// Import the add employee controller 
const vehicleController = require('../controllers/vehicle.controller');
// Create a route to handle the add employee request on post
router.post("/api/vehicle", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.addVehicle); 
// Create a route to handle the get all vehicles request on get
router.get("/api/vehicles/:customer_id", [authMiddleware.verifyToken], vehicleController.getVehicles);
//create a route to handle songle vehihle request
router.get("/api/vehicle/:vehicleId", [authMiddleware.verifyToken], vehicleController.getSingleVehicle);




// Export the router
module.exports = router;
