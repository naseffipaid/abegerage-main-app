const api_url = import.meta.env.VITE_API_URL;

const addOrder = async (serviceData, token) => {
  console.log("API URL:", api_url);
  console.log("Sending order data to API:", serviceData);  // ✅ Debugging log

  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(serviceData),
  };

  try {
    const response = await fetch(`${api_url}/api/order`, requestOptions);

    if (!response.ok) {
      console.error("Failed request. Status:", response.status);
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Export the service
const OrderService = {
  addOrder,
  
};
export default OrderService;
