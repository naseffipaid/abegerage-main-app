const api_url = import.meta.env.VITE_API_URL;

const addVehicle = async (formData, token) => {
  console.log("API URL:", api_url);
  console.log("Sending vehicle data to API:", formData);  // ✅ Debugging log

  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${api_url}/api/vehicle`, requestOptions);

    if (!response.ok) {
      console.error("Failed request. Status:", response.status);
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
// A function to to get all Vehicle
const getVehicles = async (token, customer_id) => {
  // console.log(token);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/vehicles/${customer_id}`, requestOptions);
  return response;
}
// Export the service
const VehicleService = {
  addVehicle,
  getVehicles
};
export default VehicleService;
