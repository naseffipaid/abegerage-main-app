//import api_url from .env file
const api_url = import.meta.env.VITE_API_URL;

// A function to send post request to create a new employee 
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    'x-access-token': loggedInEmployeeToken
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
}
// Export all the functions 
const employeeService = {
  createEmployee
}
export default employeeService; 