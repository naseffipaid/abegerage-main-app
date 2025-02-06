// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// A function to check if a customer exists in the database
async function checkIfCustomerExists(email) {
    const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
    const rows = await conn.query(query, [email]);
    return rows.length > 0;
}

// A function to create a new customer
async function createCustomer(customer) {
    let createdCustomer = {};
    try {
        // Insert customer email, phone number, and hash into customer_identifier table
        const query1 = `
            INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) 
            VALUES (?, ?, ?)`;
        const rows1 = await conn.query(query1, [customer.customer_email, customer.customer_phone_number, customer.customer_hash]);

        if (rows1.affectedRows !== 1) {
            return false;
        }

        // Get the customer_id from the insert operation
        const customer_id = rows1.insertId;

        // Insert customer details into the customer_info table
        const query2 = `
            INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) 
            VALUES (?, ?, ?, ?)`;
        await conn.query(query2, [customer_id, customer.customer_first_name, customer.customer_last_name, customer.active_customer_status]);

        // Construct the customer object to return
        createdCustomer = {
            customer_id: customer_id,
            customer_email: customer.customer_email,
            customer_phone_number: customer.customer_phone_number,
            customer_hash: customer.customer_hash,
            customer_first_name: customer.customer_first_name,
            customer_last_name: customer.customer_last_name
        };

    } catch (err) {
        console.log(err);
        return false;
    }

    // Return the customer object
    return createdCustomer;
}

// A function to get a customer by email
async function getCustomerByEmail(customer_email) {
    const query = `
        SELECT * FROM customer_identifier 
        INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
        WHERE customer_identifier.customer_email = ?`;
    const rows = await conn.query(query, [customer_email]);
    return rows.length ? rows[0] : null;
}

// A function to get all customers
async function getAllCustomers() {
    const query = `
        SELECT * FROM customer_identifier 
        INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
        ORDER BY customer_identifier.customer_id DESC LIMIT 10`;
    const rows = await conn.query(query);
    return rows;
}
// A function to get single Customer
async function getsingleCustomer(id) {
    const query = `
        SELECT * FROM customer_identifier 
        INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
        WHERE customer_identifier.customer_id = ?
        LIMIT 1`;

    try {
        const [rows] = await conn.query(query, [id]);
        console.log("Raw rows type:", typeof rows); // Should log 'object'
        console.log("Is rows an array?", Array.isArray(rows)); // Should log false
        console.log("Raw rows value:", rows); // Log the raw response

        // If rows is an object (single record), return it directly
        if (rows && typeof rows === 'object') {
            return rows;
        }

        console.error("No customer found or invalid query response.");
        return null;
    } catch (err) {
        console.error("Query Error:", err);
        return null;
    }
}
 async function updateCustomer(customerId, updateData) {
    try {
        const { customer_email, customer_first_name, customer_last_name, customer_phone_number, active_customer_status } = updateData;

        const customerQuery = `
            UPDATE customer_identifier 
            SET customer_email = ?,
               customer_phone_number = ?
            WHERE customer_id = ?`;
        const customerResult = await conn.query(customerQuery, [customer_email, customer_phone_number, customerId]);

        if (customerResult.affectedRows === 0) {
            return false;
        }

        const customerInfoQuery = `
            UPDATE customer_info 
            SET customer_first_name = ?, 
                customer_last_name = ?, 
                active_customer_status = ?
            WHERE customer_id = ?`;
        const customerInfoResult = await conn.query(customerInfoQuery, [customer_first_name, customer_last_name, active_customer_status, customerId]);

        if (customerInfoResult.affectedRows === 0) {
            return false;
        }
        return true;

    } catch (err) {
        console.error("Error updating customer:", err);
        return false;
    }
}
async function deleteCustomer(customerId) {
    try {
      // 1. Delete from order_status (FK: order_id)
      const orderStatusDeleteResult = await conn.query("DELETE FROM order_status WHERE order_id IN (SELECT order_id FROM orders WHERE customer_id = ?)", [customerId]);
  
      // 2. Delete from order_services (FK: order_id)
      const orderServicesDeleteResult = await conn.query("DELETE FROM order_services WHERE order_id IN (SELECT order_id FROM orders WHERE customer_id = ?)", [customerId]);
  
      // 3. Delete from order_info (FK: order_id)
      const orderInfoDeleteResult = await conn.query("DELETE FROM order_info WHERE order_id IN (SELECT order_id FROM orders WHERE customer_id = ?)", [customerId]);
  
  
      // 4. Delete from orders (FK: customer_id, vehicle_id, employee_id)
      const ordersDeleteResult = await conn.query("DELETE FROM orders WHERE customer_id = ?", [customerId]);
  
  
      // 5. Delete from customer_vehicle_info (FK: customer_id)
      const customerVehicleDeleteResult = await conn.query("DELETE FROM customer_vehicle_info WHERE customer_id = ?", [customerId]);
  
  
      // 6. Delete from customer_info (FK: customer_id)
      const customerInfoDeleteResult = await conn.query("DELETE FROM customer_info WHERE customer_id = ?", [customerId]);
  
      // 7. Delete from customer_identifier (Primary Table)
      const customerIdentifierDeleteResult = await conn.query("DELETE FROM customer_identifier WHERE customer_id = ?", [customerId]);
  
      if (customerIdentifierDeleteResult.affectedRows === 0) {
        return false; // Customer not found in the main table
      }
  
      return true; // All deletions successful
  
    } catch (err) {
      console.error("Error deleting customer:", err);
      return false;
    }
  }
  
// Export the functions for use in the controller
module.exports = {
    checkIfCustomerExists,
    createCustomer,
    getCustomerByEmail,
    getAllCustomers,
    getsingleCustomer,
    updateCustomer,
    deleteCustomer
};