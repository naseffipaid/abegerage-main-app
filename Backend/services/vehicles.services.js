// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// A function to create a new vehicle
async function addVehicle(vehicle) {
    let vehiclesData = {};
    try {
        // insert in to customer_vehicle_info table this data vehicle_id	customer_id	vehicle_year	vehicle_make	vehicle_model	vehicle_type	vehicle_mileage	vehicle_tag	vehicle_serial	vehicle_color	
        const query = `
            INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        //execute the query
        const rows = await conn.query(query, [vehicle.customer_id, vehicle.vehicle_year, vehicle.vehicle_make, vehicle.vehicle_model, vehicle.vehicle_type, vehicle.vehicle_mileage, vehicle.vehicle_tag, vehicle.vehicle_serial, vehicle.vehicle_color]);
       

        // Construct the vehicle object to return vehiclesData
        vehiclesData = {
            vehicle_id: rows.insertId,
            customer_id: vehicle.customer_id,
            vehicle_year: vehicle.vehicle_year,
            vehicle_make: vehicle.vehicle_make,
            vehicle_model: vehicle.vehicle_model,
            vehicle_type: vehicle.vehicle_type,
            vehicle_mileage: vehicle.vehicle_mileage,
            vehicle_tag: vehicle.vehicle_tag,
            vehicle_serial: vehicle.vehicle_serial,
            vehicle_color: vehicle.vehicle_color
        };

    } catch (err) {
        console.log(err);
        return false;
    }

    // Return the customer object
    return vehiclesData;
}
// A function to get all vehicle
async function getVehicles(customer_id) {
    // define query to get all vehicles by customer_id
    const query = `SELECT * FROM customer_vehicle_info WHERE customer_id = ?`;
    // execute the query
    const rows = await conn.query(query, [customer_id]);
    // return the vehicles
    return rows;
}
// A function to get single vehicle
async function getSingleVehicle(vehicleId) {
    const query = `
        SELECT 
            customer_vehicle_info.*, 
            customer_identifier.customer_email, 
            customer_identifier.customer_phone_number, 
            customer_info.customer_first_name, 
            customer_info.customer_last_name, 
            customer_info.active_customer_status
        FROM customer_vehicle_info
        INNER JOIN customer_identifier ON customer_vehicle_info.customer_id = customer_identifier.customer_id
        INNER JOIN customer_info ON customer_vehicle_info.customer_id = customer_info.customer_id
        WHERE customer_vehicle_info.vehicle_id = ?`;

    try {
        const rows = await conn.query(query, [vehicleId]);  
        console.log("Fetched Data:", rows);  // ✅ Debugging: Check the response
        return rows;
    } catch (error) {
        console.error("Error fetching vehicle and customer details:", error);
        throw error;
    }
}
async function updateVehicle(vehicleId, updateData) {
    try {
        const { vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color } = updateData;

        const vehicleQuery = `
            UPDATE customer_vehicle_info
            SET vehicle_year = ?,
                vehicle_make = ?,
                vehicle_model = ?,
                vehicle_type = ?,
                vehicle_mileage = ?,
                vehicle_tag = ?,
                vehicle_serial = ?,
                vehicle_color = ?
            WHERE vehicle_id = ?`;

        const vehicleResult = await conn.query(vehicleQuery, [
            vehicle_year,
            vehicle_make,
            vehicle_model,
            vehicle_type,
            vehicle_mileage,
            vehicle_tag,
            vehicle_serial,
            vehicle_color,
            vehicleId
        ]);

        if (vehicleResult.affectedRows === 0) {
            return false; // Or handle the case where no rows were updated
        }

        return true;

    } catch (err) {
        console.error("Error updating vehicle:", err);
        return false;
    }
}
async function deleteVehicle(vehicleId) {
    try {
        // 1. Delete from order_services (FK: order_id, which is FK to orders, which is FK to customer_vehicle_info)
        const orderServicesDeleteResult = await conn.query(`
            DELETE FROM order_services 
            WHERE order_id IN (SELECT order_id FROM orders WHERE vehicle_id = ?)`, 
            [vehicleId]
        );

        // 2. Delete from order_status (FK: order_id, which is FK to orders, which is FK to customer_vehicle_info)
        const orderStatusDeleteResult = await conn.query(`
            DELETE FROM order_status 
            WHERE order_id IN (SELECT order_id FROM orders WHERE vehicle_id = ?)`, 
            [vehicleId]
        );

        // 3. Delete from order_info (FK: order_id, which is FK to orders, which is FK to customer_vehicle_info)
        const orderInfoDeleteResult = await conn.query(`
            DELETE FROM order_info 
            WHERE order_id IN (SELECT order_id FROM orders WHERE vehicle_id = ?)`, 
            [vehicleId]
        );

        // 4. Delete from orders (FK: vehicle_id)
        const ordersDeleteResult = await conn.query("DELETE FROM orders WHERE vehicle_id = ?", [vehicleId]);

        // 5. Finally, delete the vehicle itself
        const vehicleDeleteResult = await conn.query("DELETE FROM customer_vehicle_info WHERE vehicle_id = ?", [vehicleId]);


        if (vehicleDeleteResult.affectedRows === 0) {
            return false; // Vehicle not found
        }

        return true; // All deletions successful

    } catch (err) {
        console.error("Error deleting vehicle:", err);
        return false;
    }
}
// Export the functions for use in the controller
module.exports = {
    addVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
    
};