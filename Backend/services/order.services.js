const conn = require("../config/db.config");

// Function to check if an order already exists for a specific customer & vehicle
async function checkExistingOrder(vehicle_id) {
    try {
        const query = `SELECT order_id FROM orders WHERE vehicle_id = ? LIMIT 1`;
        const rows = await conn.query(query, [vehicle_id]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error("Error checking existing order:", err);
        return null;
    }
}

async function addOrder(orderData) {
    let order = {};

    try {
        // Check for duplicate order by `vehicle_id`
        const existingOrder = await checkExistingOrder(orderData.vehicle_id);
        if (existingOrder) {
            return false; // Prevent duplicate order insertion
        }
        // Query 1: Insert into orders table
        const query1 = `
            INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) 
            VALUES (?, ?, ?, ?, ?)`;
        const rows1 = await conn.query(query1, [
            orderData.employee_id,
            orderData.customer_id,
            orderData.vehicle_id,
            orderData.active_order,
            orderData.order_hash
        ]);

        const order_id = rows1.insertId; // Get inserted order_id

        // Query 2: Insert into order_info table
        const query2 = `
            INSERT INTO order_info (order_id, order_total_price, additional_request, additional_requests_completed) 
            VALUES (?, ?, ?, ?)`;
        await conn.query(query2, [
            order_id,
            orderData.order_total_price,
            orderData.additional_request,
            0 // Default additional_requests_completed = 0
        ]);

        // Query 3: Insert into order_services table (for each service)
        const serviceInsertions = orderData.service_id.map(service_id => {
            const query3 = `
                INSERT INTO order_services (order_id, service_id, service_completed) 
                VALUES (?, ?, ?)`;
            return conn.query(query3, [order_id, service_id, orderData.service_completed]);
        });

        await Promise.all(serviceInsertions); // Execute all service insertions

        // Query 4: Check order_services for inserted services' completion status
        const query4 = `
            SELECT service_completed FROM order_services WHERE order_id = ?`;
        const serviceCompletionRows = await conn.query(query4, [order_id]);

        // Ensure serviceCompletionRows is an array
        const completionData = Array.isArray(serviceCompletionRows) ? serviceCompletionRows : [];

        // Determine order status: "Completed" if all 1s, "In Progress" if any 0 exists
        const isCompleted = completionData.every(row => row.service_completed === 1);
        const orderStatus = isCompleted ? 1 : 0; // Use 1 for "Completed", 0 for "In Progress"

        // Query 5: Insert into order_status table
        const query5 = `
            INSERT INTO order_status (order_id, order_status) 
            VALUES (?, ?)`;
        await conn.query(query5, [order_id, orderStatus]);

        // Construct and return order object
        order = { order_id };

    } catch (err) {
        console.error("Error inserting order:", err);
        return false;
    }

    return order;
} 
// A function to get all orders
async function getOrders() {
    // define query to get all orders
    const query = `
    SELECT 
        orders.order_id,
        customer_info.customer_first_name, 
        customer_info.customer_last_name,
        customer_identifier.customer_email,
        customer_identifier.customer_phone_number,
        customer_vehicle_info.vehicle_make,
        customer_vehicle_info.vehicle_year,
        customer_vehicle_info.vehicle_tag,
        orders.order_date,
        company_roles.company_role_name,
        employee_info.employee_first_name,
        order_status.order_status,
        orders.order_hash
    FROM orders
    JOIN customer_identifier ON orders.customer_id = customer_identifier.customer_id
    JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
    JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id
    JOIN employee ON orders.employee_id = employee.employee_id
    JOIN employee_info ON employee.employee_id = employee_info.employee_id
    JOIN employee_role ON employee.employee_id = employee_role.employee_id
    JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id
    JOIN order_status ON orders.order_id = order_status.order_id
    ORDER BY orders.order_id DESC
`;
    // execute the query
    const rows = await conn.query(query);
    // return the services
    return rows;
}
// A function to get single order
async function getSingleOrder(orderHash) {
    const query = `SELECT 
    orders.order_id,
    orders.order_date,
    orders.active_order,
    order_status.order_status,
    
    customer_identifier.customer_email,
    customer_identifier.customer_phone_number,
    customer_info.customer_first_name,
    customer_info.customer_last_name,
    customer_info.active_customer_status,

    customer_vehicle_info.vehicle_year,
    customer_vehicle_info.vehicle_make,
    customer_vehicle_info.vehicle_model,
    customer_vehicle_info.vehicle_type,
    customer_vehicle_info.vehicle_mileage,
    customer_vehicle_info.vehicle_tag,
    customer_vehicle_info.vehicle_serial,
    customer_vehicle_info.vehicle_color,

    order_info.order_total_price,
    order_info.estimated_completion_date,
    order_info.completion_date,
    order_info.additional_request,
    order_info.notes_for_internal_use,
    order_info.notes_for_customer,
    order_info.additional_requests_completed,

    order_services.service_id,
    common_services.service_name,
    common_services.service_description,
    order_services.service_completed

     FROM orders
     INNER JOIN order_status ON orders.order_id = order_status.order_id
     INNER JOIN order_info ON orders.order_id = order_info.order_id
     INNER JOIN customer_identifier ON orders.customer_id = customer_identifier.customer_id
     INNER JOIN customer_info ON orders.customer_id = customer_info.customer_id
     INNER JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id
     INNER JOIN order_services ON orders.order_id = order_services.order_id
     INNER JOIN common_services ON order_services.service_id = common_services.service_id

    WHERE orders.order_hash = ?`;

    try {
        const rows = await conn.query(query, [orderHash]);  
        console.log("Fetched Data:", rows);  // ✅ Debugging: Check the response
        return rows;
    } catch (error) {
        console.error("Error fetching order :", error);
        throw error;
    }
}

// Export the functions for use in the controller
module.exports = {
    checkExistingOrder,
    addOrder,
    getOrders,
    getSingleOrder
    
};