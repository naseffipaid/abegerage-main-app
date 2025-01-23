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
  // Export the createEmployee controller 
  module.exports = {
    addService,
    getservices
    
  };