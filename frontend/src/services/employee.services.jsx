const api_url = import.meta.env.VITE_API_URL;

// A function to send POST request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

// A function to send GET request to fetch all employees
const getAllEmployees = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
};

// A function to fetch a single employee by ID
const getSingleEmployee = async (employeeId, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/employee/${employeeId}`, requestOptions);
  return response;
};

// A function to send PUT request to update an existing employee
const updateEmployee = async (employeeId, formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/employee/${employeeId}`, requestOptions);
  return response;
};
const deleteEmployee = async (employeeId, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    }
  };
  const response = await fetch(`${api_url}/api/employee/${employeeId}`, requestOptions);
  return response;
};
// Export all functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee, // Newly added function
  updateEmployee,
  deleteEmployee
};

export default employeeService;