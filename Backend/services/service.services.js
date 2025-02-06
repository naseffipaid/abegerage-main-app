// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// A function to create a new vehicle
async function addServices(serviceData) {
    let service = {};
    try {
        //insert in to common_services this service_name,service_description rows
        const query = `
            INSERT INTO common_services (service_name, service_description) 
            VALUES (?, ?)`;	
        //execute the query
        const rows = await conn.query(query, [serviceData.service_name, serviceData.service_description]);
       
       

        // Construct the vehicle object to return vehiclesData
        service = {
            service_id: rows.insertId,
            service_name: serviceData.service_name,
            vehicle_year: serviceData.service_description,
        };
    } catch (err) {
        console.log(err);
        return false;
    }

    // Return the service object
    return service;
}
// A function to get all customers
async function getServices() {
    // define query to get all vehicles 
    const query = `SELECT * FROM common_services`;
    // execute the query
    const rows = await conn.query(query);
    // return the services
    return rows;
}
//  A function to get single Service
async function getSingleService(serviceId) {
    const query = `
        SELECT * FROM common_services  
        WHERE service_id = ?
        LIMIT 1`;

    try {
        const [rows] = await conn.query(query, [serviceId]);
        console.log("Raw rows type:", typeof rows); // Should log 'object'
        console.log("Is rows an array?", Array.isArray(rows)); // Should log false
        console.log("Raw rows value:", rows); // Log the raw response

        // If rows is an object (single record), return it directly
        if (rows && typeof rows === 'object') {
            return rows;
        }

        console.error("No service found or invalid query response.");
        return null;
    } catch (err) {
        console.error("Query Error:", err);
        return null;
    }
}
async function updateService(serviceId, updateData) {
    try {
        const { service_name, service_description } = updateData;

        const serviceQuery = `
            UPDATE common_services 
            SET service_name = ?,
               service_description = ?
            WHERE service_id = ?`;
        const customerResult = await conn.query(serviceQuery, [service_name, service_description, serviceId]);

        if (customerResult.affectedRows === 0) {
            return false;
        }

        return true;

    } catch (err) {
        console.error("Error updating service:", err);
        return false;
    }
}
async function deleteService(serviceId) {
    try {
        // 1. Delete from order_services (FK: service_id)
        const orderServicesDeleteResult = await conn.query("DELETE FROM order_services WHERE service_id = ?", [serviceId]);

        // 2. Get the order IDs that were just deleted from order_services
        const [ordersToDelete] = await conn.query("SELECT order_id FROM order_services WHERE service_id = ?", [serviceId]);

        // 3. If there are orders to delete, delete from order_status, order_info, and orders
        if (ordersToDelete && ordersToDelete.length > 0) { // Check if ordersToDelete exists AND has length
            const orderIds = ordersToDelete.map(order => order.order_id);

            // 4. Delete from order_status (FK: order_id)
            await conn.query(`DELETE FROM order_status WHERE order_id IN (${orderIds.join(',')})`);

            // 5. Delete from order_info (FK: order_id)
            await conn.query(`DELETE FROM order_info WHERE order_id IN (${orderIds.join(',')})`);

            // 6. Delete from orders (FK: vehicle_id, customer_id, employee_id)
            await conn.query(`DELETE FROM orders WHERE order_id IN (${orderIds.join(',')})`);
        }

        // 7. Finally, delete the service from common_services
        const serviceDeleteResult = await conn.query("DELETE FROM common_services WHERE service_id = ?", [serviceId]);

        if (serviceDeleteResult.affectedRows === 0) {
            return false; // Service not found
        }

        return true;

    } catch (err) {
        console.error("Error deleting service:", err);
        return false;
    }
}
// Export the functions for use in the controller
module.exports = {
    addServices,
    getServices,
    getSingleService,
    updateService,
    deleteService
    
};