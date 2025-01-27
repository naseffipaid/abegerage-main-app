const api_url = import.meta.env.VITE_API_URL;

const addOrder = async (serviceData, token) => {
  console.log("API URL:", api_url);
  console.log("Sending order data to API:", serviceData);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(serviceData),
  };

  try {
    const response = await fetch(`${api_url}/api/order`, requestOptions);
    
    // ✅ Read the JSON **inside** `addOrder` to avoid calling `.json()` twice
    const data = await response.json();

    console.log("Response from API:", data); // ✅ Debugging log

    if (!response.ok) {
      console.error("Failed request. Status:", response.status, "Response:", data);
      throw new Error(data.error || "Request failed");
    }

    return data; // ✅ Return parsed JSON directly
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // ✅ Throw error so it can be handled in `handleSubmit`
  }
};

// A function to to get all Orders
const getAllOrders = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/orders`, requestOptions);
  console.log(response)
  return response;
  
}

const getSingleOrder = async (token,orderHash) => {
  // console.log(token);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/order/${orderHash}`, requestOptions);
  return response;
}
// Export the service
const OrderService = {
  addOrder,
  getAllOrders,
  getSingleOrder
  
};
export default OrderService;
