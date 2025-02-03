//import emploeyee service
const employeeService = require('../services/employee.services');
// Create the add employee controller createEmployee function
async function createEmployee(req, res, next) {
    // Check if employee email already exists in the database 
    const employeeExists = await employeeService.checkIfEmployeeExists(req.body.employee_email);
    // If employee exists, send a response to the client
    if (employeeExists) {
      res.status(400).json({
        error: "This email address is already associated with another employee!"
      });
    } else {
      try {
        const employeeData = req.body;
        // Create the employee
        const employee = await employeeService.createEmployee(employeeData);
        if (!employee) {
          res.status(400).json({
            error: "Failed to add the employee!"
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
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service 
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}
async function getEmployee(req, res, next) {
    
    const {employeeId } = req.params
    const employee = await employeeService.getEmployee(employeeId);
    console.log("Database response:", employee); // Log the database response

    // Check if employee data is valid
    if (!employee || Object.keys(employee).length === 0) {
        console.error("employee not found!"); // Debugging log
        return res.status(404).json({ error: "employee not found!" });
    }

    console.log("Returning employee data to client...");
    return res.status(200).json({
        status: "success",
        data: employee,
    });
}

  // Export the createEmployee controller 
  module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployee
  };