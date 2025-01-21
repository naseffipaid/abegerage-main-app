const vehicleService = require('../services/vehicles.services');
// Create the add employee controller createEmployee function
async function addVehicle(req, res, next) {
    
      try {
        const vehicleData = req.body;
        // Create the employee
        const vehicle = await vehicleService.addVehicle(vehicleData);
        if (!vehicle) {
          res.status(400).json({
            error: "Failed to add the customer!"
          });
        } else {
          res.status(200).json({
            status: "true",
          });
        }
      } catch (error) {
        console.log(err);
        res.status(400).json({
          error: "Something went wrong!"
        });
      }
    }
  

 
  // Export the createEmployee controller 
  module.exports = {
    addVehicle,
    
  };