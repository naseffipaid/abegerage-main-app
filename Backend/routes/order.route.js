//  Import the express module
const express = require('express');
const authMiddleware = require('../middlewares/auth.miiddleware');
// Call the router method from express to create the router
const router = express.Router();
// Import the add service controller 
const orderController = require('../controllers/order.controller');
// Create a route to handle the add order request on post
router.post("/api/order", [authMiddleware.verifyToken], orderController.addOrder); 
// Create a route to handle the get all orders request on get
router.get("/api/orders", [authMiddleware.verifyToken], orderController.getorders);
// Create a route to handle the get single order request on get
router.get("/api/order/:orderHash", [authMiddleware.verifyToken], orderController.getSingleOrder);

// Create a route to handle edit order request on put 
router.put("/api/order/:orderHash", [authMiddleware.verifyToken], orderController.updateServiceStatus);
// Create a route to handle the get single order request for customer
router.get("/api/order/customer/:orderHash", orderController.getSingleOrder);
// Create a route to handle edit order request on put , for additional orders orders
router.put("/api/order/additional/:orderHash", [authMiddleware.verifyToken], orderController.updateAdditionalRequest);
// Create a route to handle delete order request on delete 
router.delete("/api/order/:orderHash", [authMiddleware.verifyToken, authMiddleware.isAdmin], orderController.deleteOrder);
// / Create a route to handle gey order request by customer id 
router.get("/api/order/byCustomer/:customerId", [authMiddleware.verifyToken], orderController.getOrderByCustomer);


module.exports = router