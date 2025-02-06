const api_url = import.meta.env.VITE_API_URL;

const addService = async (formData, token) => {
  console.log("API URL:", api_url);
  console.log("Sending service data to API:", formData);  // ✅ Debugging log

  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${api_url}/api/service`, requestOptions);

    if (!response.ok) {
      console.error("Failed request. Status:", response.status);
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
// A function to to get all services
const getServices = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response;
}
const getSingleService = async (token, serviceId) => {
  const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
      }
  };
  const response = await fetch(`${api_url}/api/service/${serviceId}`, requestOptions);
  return response;
};
const updateService = async (serviceId, formData, token) => {
  const requestOptions = {
      method: 'PUT', // Or PATCH, depending on your API
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(formData),
  };

  const response = await fetch(`${api_url}/api/service/${serviceId}`, requestOptions);
  return response;
};
const deleteService = async (serviceId, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    }
  };
  const response = await fetch(`${api_url}/api/service/${serviceId}`, requestOptions);
  return response;
};
// Export the service
const ServiceService = {
  addService,
  getServices,
  getSingleService,
  updateService,
  deleteService
};
export default ServiceService;
