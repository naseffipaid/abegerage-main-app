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

// Export the functions for use in the controller
module.exports = {
    addServices,
    getServices
    
};