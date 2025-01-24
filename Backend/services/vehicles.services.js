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
// Export the functions for use in the controller
module.exports = {
    addVehicle,
    getVehicles,
    getSingleVehicle
    
};