// Import the query function from the db.config.js file 
const conn = require("../config/db.config");
// Import the bcrypt module 
const bcrypt = require('bcrypt');
// A function to check if employee exists in the database 
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new employee 
async function createEmployee(employee) {
    let createdEmployee = {};
    try {
      // Generate a salt and hash the password 
      const salt = await bcrypt.genSalt(10);
      // Hash the password 
      const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
      // Insert the email in to the employee table  
      const query = "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
      const rows = await conn.query(query, [employee.employee_email, employee.active_employee]);
      console.log(rows);
      if (rows.affectedRows !== 1) {
        return false;
      }
      // Get the employee id from the insert 
      const employee_id = rows.insertId;
      // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables  
      const query2 = "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
      const rows2 = await conn.query(query2, [employee_id, employee.employee_first_name, employee.employee_last_name, employee.employee_phone]);
      const query3 = "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
      const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
      const query4 = "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
      const rows4 = await conn.query(query4, [employee_id, employee.company_role_id]);
      // construct to the employee object to return 
      createdEmployee = {
        employee_id: employee_id
      }
    } catch (err) {
      console.log(err);
    }
    // Return the employee object 
    return createdEmployee;
  }
  // A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query = "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}
// A function to get all employees
async function getAllEmployees() {
  const query = "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";
  const rows = await conn.query(query);
  return rows;
}               
async function getEmployee(employeeId) {
  const query = `
  SELECT * FROM employee 
  INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id 
  INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id 
  INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id
  WHERE employee.employee_id = ?
  LIMIT 1`;

    try {
        const [rows] = await conn.query(query, [employeeId]);
        console.log("Raw rows type:", typeof rows); // Should log 'object'
        console.log("Is rows an array?", Array.isArray(rows)); // Should log false
        console.log("Raw rows value:", rows); // Log the raw response

        // If rows is an object (single record), return it directly
        if (rows && typeof rows === 'object') {
            return rows;
        }

        console.error("No employee found or invalid query response.");
        return null;
    } catch (err) {
        console.error("Query Error:", err);
        return null;
    }
}
  async function updateEmployee(employeeId, updateData) {
    try {
        const { employee_email, employee_first_name, employee_last_name, employee_phone, company_role_name, active_employee } = updateData;

        const employeeQuery = `
            UPDATE employee 
            SET employee_email = ?,
               active_employee = ?
            WHERE employee_id = ?`;
          // *** KEY CHANGE: Convert active_employee to a number ***
        const activeEmployeeValue = Number(active_employee) 

        const employeeResult = await conn.query(employeeQuery, [employee_email, activeEmployeeValue, employeeId]);

        if (employeeResult.affectedRows === 0) {
            return false;
        }

        const employeeInfoQuery = `
            UPDATE employee_info 
            SET employee_first_name = ?, 
                employee_last_name = ?, 
                employee_phone = ?
            WHERE employee_id = ?`;
        const employeeInfoResult = await conn.query(employeeInfoQuery, [employee_first_name, employee_last_name, employee_phone, employeeId]);

        if (employeeInfoResult.affectedRows === 0) {
            return false;
        }

        // Update employee_role table (Simplified - no role check)
        const employeeRoleUpdateQuery = `
            UPDATE employee_role
            SET company_role_id = ?
            WHERE employee_id = ?`;
        const employeeRoleUpdateResult = await conn.query(employeeRoleUpdateQuery, [company_role_name, employeeId]);

        if (employeeRoleUpdateResult.affectedRows === 0) {
            return false;
        }

        return true;

    } catch (err) {
        console.error("Error updating employee:", err);
        return false;
    }
}
async function deleteEmployee(employeeId) {
  try {
    // Delete from employee_role table FIRST
    const employeeRoleDeleteResult = await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [employeeId]);
    if (employeeRoleDeleteResult.affectedRows === 0 ) { // Check if any rows were affected
      return false; // Or handle as you see fit if no role is found
    }

    // Delete from employee_info table SECOND
    const employeeInfoDeleteResult = await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [employeeId]);
      if (employeeInfoDeleteResult.affectedRows === 0) { // Check if any rows were affected
        return false; // Or handle as you see fit if no info is found
      }
    // Delete from employee_pass table THIRD
    const employeePassDeleteResult = await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [employeeId]);
      if (employeePassDeleteResult.affectedRows === 0) { // Check if any rows were affected
        return false; // Or handle as you see fit if no pass is found
      }

    // Delete from employee table LAST
    const employeeDeleteResult = await conn.query("DELETE FROM employee WHERE employee_id = ?", [employeeId]);
    if (employeeDeleteResult.affectedRows === 0) {
      return false;
    }

    return true; // Return true only if all deletions are successful

  } catch (err) {
    console.error("Error deleting employee:", err);
    return false;
  }
}
  // Export the functions for use in the controller
  module.exports = {
    checkIfEmployeeExists,
    createEmployee,
    getEmployeeByEmail,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
  }; 