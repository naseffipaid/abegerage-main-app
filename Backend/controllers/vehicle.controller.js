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
    // Create the getAllEmployees controller 
async function getVehicles(req, res, next) {
  // extract customer_id from the request params
  const { customer_id } = req.params;
  // Call the getvehicles method from the employee service 
  const vehicles = await vehicleService.getVehicles(customer_id);
  // console.log(employees);
  if (!vehicles) {
    res.status(400).json({
      error: "Failed to get all customers!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: vehicles,
    });
  }
}
  // Export the createEmployee controller 
  module.exports = {
    addVehicle,
    getVehicles
    
  };