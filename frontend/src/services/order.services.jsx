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
const getSingleOrderbyCustomer = async (token,id) => {
  // console.log(token);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/order/byCustomer/${id}`, requestOptions);
  return response;
}
const getSingleOrderCustomer = async (orderHash) => {
  // console.log(token);
  const requestOptions = {
    method: 'GET',
  };
  const response = await fetch(`${api_url}/api/order/customer/${orderHash}`, requestOptions);
  return response;
}
const updateServiceStatus = async (token, orderHash, serviceId, status) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      service_id: parseInt(serviceId, 10),  // ✅ Ensure service_id is included
      service_completed: parseInt(status, 10)  // ✅ Ensure Integer
    }),
  };

  try {
    const response = await fetch(`${api_url}/api/order/${orderHash}`, requestOptions);
    console.log("Raw Response:", response); // ✅ Debugging: Log response object

    const responseText = await response.text(); // ✅ Read response as text (before parsing)
    console.log("Response Text:", responseText); // ✅ Debugging: Log raw response

    // ✅ Check if response is JSON
    
    return response;

  } catch (error) {
    console.error("Error updating service status:", error);
    return { error: "Failed to update service status" };
  }
};
const handleAdditionalRequestUpdate = async (token, orderHash, status) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({additional_requests_completed: parseInt(status, 10)  // ✅ Ensure Integer
 }),
  };

  try {
    const response = await fetch(`${api_url}/api/order/additional/${orderHash}`, requestOptions);
    console.log("Raw Response:", response); // ✅ Debugging: Log response object

    const responseText = await response.text(); // ✅ Read response as text (before parsing)
    console.log("Response Text:", responseText); // ✅ Debugging: Log raw response

    // ✅ Check if response is JSON
    
    return response;

  } catch (error) {
    console.error("Error updating service status:", error);
    return { error: "Failed to update service status" };
  }
};
const deleteOrder = async (orderHash, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    }
  };
  const response = await fetch(`${api_url}/api/order/${orderHash}`, requestOptions);
  return response;
};
// Export the service
const OrderService = {
  addOrder,
  getAllOrders,
  getSingleOrder,
  updateServiceStatus,
  getSingleOrderCustomer,
  handleAdditionalRequestUpdate,
  getSingleOrderbyCustomer,
  deleteOrder
   
};
export default OrderService;
