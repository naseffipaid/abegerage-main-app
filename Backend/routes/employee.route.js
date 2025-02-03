// Import the express module
const express = require('express');
const authMiddleware = require('../middlewares/auth.miiddleware');
// Call the router method from express to create the router
const router = express.Router();
// Import the add employee controller 
const employeeController = require('../controllers/employee.controller');
// Create a route to handle the add employee request on post
router.post("/api/employee", employeeController.createEmployee); 
// Create a route to handle the get all employees request on get
router.get("/api/employees", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.getAllEmployees);
// Create a route to handle the get single employee request on get
router.get("/api/employee/:employeeId", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.getEmployee);
// Create a route to handle update single employee request on put
// router.get("/api/employee/:employeeId", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.updateEmployee);





// Export the router
module.exports = router;
