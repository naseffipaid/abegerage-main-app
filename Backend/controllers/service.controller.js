const serviceService = require('../services/service.services');
// Create the add eservice controller createEmployee function
async function addService(req, res, next) {
    
      try {
        const serviceData = req.body;
        // Create the service
        const service = await serviceService.addServices(serviceData);
        if (!service) {
          res.status(400).json({
            error: "Failed to add the service!"
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
    // Create the get services controller 
async function getservices(req, res, next) {
  // Call the getservices method from the employee service 
  const services = await serviceService.getServices();
  // console.log(services);
  if (!services) {
    res.status(400).json({
      error: "Failed to get all services!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: services,
    });
  }
}
// Create the getsingle service controller 
 async function getSingleService(req, res, next) {
  // extract vehicleId from the request params
  const { serviceId } = req.params;
  // Call the getSinglevehicle method from the vehicle service 
  const service = await serviceService.getSingleService(serviceId);
  // console.log(employees);
  if (!service) {
    res.status(400).json({
      error: "Failed to get a service!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: service,
    });
  }
}
async function updateService(req, res) {
  try {
    const { serviceId } = req.params;
    const updateData = req.body;

    if (!updateData) {
      return res.status(400).json({ error: "Missing service_id " });
    }

    const result = await serviceService.updateService(serviceId, updateData);

    if (!result) {
      return res.status(400).json({ error: "Failed to update service." });
    }

    return res.status(200).json({ success: true, message: "service updated successfully." });
  } catch (error) {
    console.error("Error updating service status:", error);
    return res.status(500).json({ error: "Internal Server Error. Please check server logs." }); // ✅ Always return JSON
  }
}
async function deleteService(req, res) {
  try {
    const { serviceId } = req.params;

    if (!serviceId) {
      return res.status(400).json({ error: "Missing service_id " });
    }

    const result = await serviceService.deleteService(serviceId);

    if (!result) {
      return res.status(400).json({ error: "Failed to delete service." });
    }

    return res.status(200).json({ success: true, message: "service deleted successfully." });
  } catch (error) {
    console.error("Error deleting service status:", error);
    return res.status(500).json({ error: "Internal Server Error. Please check server logs." }); // ✅ Always return JSON
  }
}
  // Export the createEmployee controller 
  module.exports = {
    addService,
    getservices,
    getSingleService,
    updateService,
    deleteService
  };