import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHandPointer, FaEdit, FaTimesCircle } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import customerService from "../../../services/customer.services";
import vehicleService from "../../../services/vehicles.services";

const CreateNewOrder = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    if (!token || !id) {
      console.warn("Waiting for token and ID to be set before fetching...");
      return; // Prevent early API call
    }

    const fetchCustomer = async () => {
      try {
        console.log("Fetching customer with token:", token, "and ID:", id);

        const response = await customerService.getSingleCustomer(token, id);

        if (!response.ok) {
          setApiError(true);
          setApiErrorMessage("Customer not found.");
          return;
        }

        const data = await response.json();
        if (data && data.data) {
          setCustomer(data.data);
        } else {
          setApiError(true);
          setApiErrorMessage("Invalid response from the server.");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setApiError(true);
        setApiErrorMessage("An error occurred while fetching data.");
      }
    };

    const fetchVehicles = async () => {
      try {
        console.log("Fetching vehicles for customer ID:", id);
        const response = await vehicleService.getVehicles(token, id);

        if (!response.ok) {
          console.error("Failed to fetch vehicles");
          return;
        }

        const data = await response.json();
        if (data && data.data) {
          setVehicles(data.data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchCustomer();
    fetchVehicles();
  }, [token, id]);

  return (
    <div className="container mt-4 mx-auto">
      <h3 className="mb-5 mt-5 text-primary">Create a new order</h3>
      {apiError ? (
        <div className="alert alert-danger">{apiErrorMessage}</div>
      ) : (
        customer && (
          <div className="card shadow-sm p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="text-primary fw-bold">
                  {customer?.customer_first_name} {customer?.customer_last_name}
                </h4>
                <p className="mb-1">
                  <strong>Email:</strong> {customer?.customer_email}
                </p>
                <p className="mb-1">
                  <strong>Phone Number:</strong> {customer.customer_phone_number}
                </p>
                <p className="mb-1">
                  <strong>Active Customer:</strong> {customer.active_customer_status ? "Yes" : "No"}
                </p>
                <p className="mb-0">
                  <strong>Edit customer info:</strong>{" "}
                  <Link to="/edit-customer" className="text-danger">
                    <FaEdit />
                  </Link>
                </p>
              </div>
              <button className="btn btn-danger">
                <FaTimesCircle />
              </button>
            </div>
          </div>
        )
      )}

      {/* Vehicle Selection Section */}
      <div className="card shadow-sm p-3">
        <h4 className="text-primary fw-bold mb-3">Choose a vehicle</h4>
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Type</th>
                <th>Tag</th>
                <th>Serial</th>
                <th>Color</th>
                <th>Mileage</th>
                <th>Choose</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <tr key={vehicle.vehicle_id}>
                    <td>{vehicle.vehicle_year}</td>
                    <td>{vehicle.vehicle_make}</td>
                    <td>{vehicle.vehicle_model}</td>
                    <td>{vehicle.vehicle_type}</td>
                    <td>{vehicle.vehicle_tag}</td>
                    <td>{vehicle.vehicle_serial}</td>
                    <td>{vehicle.vehicle_color}</td>
                    <td>{vehicle.vehicle_mileage}</td>
                    <td>
                      <Link to="/select-vehicle" className="text-dark">
                        <FaHandPointer style={{ cursor: "pointer" }} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-muted">No vehicles found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateNewOrder;
