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
 // Create the getsingle vehicle controller 
 async function getSingleVehicle(req, res, next) {
  // extract vehicleId from the request params
  const { vehicleId } = req.params;
  // Call the getSinglevehicle method from the vehicle service 
  const vehicle = await vehicleService.getSingleVehicle(vehicleId);
  // console.log(employees);
  if (!vehicle) {
    res.status(400).json({
      error: "Failed to get a vehicle!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: vehicle,
    });
  }
}
async function updateVehicle(req, res) {
  try {
    const { vehicleId } = req.params;
    const updateData = req.body;

    if (!updateData) {
      return res.status(400).json({ error: "Missing vehicle_id " });
    }

    const result = await vehicleService.updateVehicle(vehicleId, updateData);

    if (!result) {
      return res.status(400).json({ error: "Failed to update vehicle." });
    }

    return res.status(200).json({ success: true, message: "Vehicle updated successfully." });
  } catch (error) {
    console.error("Error updating vehicle status:", error);
    return res.status(500).json({ error: "Internal Server Error. Please check server logs." }); // ✅ Always return JSON
  }
}
async function deleteVehicle(req, res) {
  try {
    const { vehicleId } = req.params;

    if (!vehicleId) {
      return res.status(400).json({ error: "Missing vehicle_id " });
    }

    const result = await vehicleService.deleteVehicle(vehicleId);

    if (!result) {
      return res.status(400).json({ error: "Failed to delete vehicle." });
    }

    return res.status(200).json({ success: true, message: "vehicle deleted successfully." });
  } catch (error) {
    console.error("Error deleting vehicle status:", error);
    return res.status(500).json({ error: "Internal Server Error. Please check server logs." }); // ✅ Always return JSON
  }
}

  // Export the createEmployee controller 
  module.exports = {
    addVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
  };