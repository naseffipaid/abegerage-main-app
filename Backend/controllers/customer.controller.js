const customerService = require('../services/customer.services');
// Create the add employee controller createEmployee function
async function createCustomer(req, res, next) {
    // Check if employee email already exists in the database 
    const customerExists = await customerService.checkIfCustomerExists(req.body.customer_email);
    // If employee exists, send a response to the client
    if (customerExists) {
      res.status(400).json({
        error: "This email address is already associated with another customer!"
      });
    } else {
      try {
        const customerData = req.body;
        // Create the employee
        const customer = await customerService.createCustomer(customerData);
        if (!customer) {
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
  }

  // Create the getAllEmployees controller 
async function getAllCustomers(req, res, next) {
  // Call the getAllEmployees method from the employee service 
  const customers = await customerService.getAllCustomers();
  // console.log(employees);
  if (!customers) {
    res.status(400).json({
      error: "Failed to get all customers!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: customers,
    });
  }
}
 // Create the get single customer controller 
 async function getsingleCustomer(req, res, next) {
    const rawId = req.params.id; // Extract raw ID
    const id = parseInt(rawId.trim(), 10); // Remove any spaces and convert to an integer
    console.log("Sanitized ID:", id); // Log the sanitized ID

    const customer = await customerService.getsingleCustomer(id);
    console.log("Database response:", customer); // Log the database response

    // Check if customer data is valid
    if (!customer || Object.keys(customer).length === 0) {
        console.error("Customer not found!"); // Debugging log
        return res.status(404).json({ error: "Customer not found!" });
    }

    console.log("Returning customer data to client...");
    return res.status(200).json({
        status: "success",
        data: customer,
    });
}
  // Export the createEmployee controller 
  module.exports = {
    createCustomer,
    getAllCustomers,
    getsingleCustomer
  };