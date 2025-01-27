const orderService = require('../services/order.services');
// Create the add eservice controller createEmployee function
async function addOrder(req, res, next) {
  try {
      const orderData = req.body;

      // ✅ Check if an order already exists for this vehicle
      const existingOrder = await orderService.checkExistingOrder(orderData.vehicle_id);
      if (existingOrder) {
          return res.status(409).json({ 
              error: "An order already exists for this vehicle. You can only edit the existing order." 
          });
      }

      // ✅ Create the order if no existing order
      const order = await orderService.addOrder(orderData);
      if (!order) {
          return res.status(400).json({ 
              error: "Failed to add the order. Please try again later." 
          });
      }

      return res.status(201).json({ success: true, order_id: order.order_id });

  } catch (err) {
      console.error("Error in addOrder controller:", err);
      return res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
}
    // Create the get order controller 
async function getorders(req, res, next) {
  // Call the getOrders method from the order services
  const orders = await orderService.getOrders();
  // console.log(orders);
  if (!orders) {
    res.status(400).json({
      error: "Failed to get all orders!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: orders,
    });
  }
}
// Create the getsingle order controller 
 async function getSingleOrder(req, res, next) {
  // extract orderHash from the request params
  const { orderHash } = req.params;
  // Call the getSingorder method from the order service 
  const order = await orderService.getSingleOrder(orderHash);
  // console.log(order);
  if (!order) {
    res.status(400).json({
      error: "Failed to get a order!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: order,
    });
  }
}
  // Export the createEmployee controller 
  module.exports = {
    addOrder,
    getorders,
    getSingleOrder
    
  };