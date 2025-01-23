import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHandPointer } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import vehicleService from "../../../services/vehicles.services";

const VehiclePerCustomer = () => {
  const { id } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    if (!token || !id) {
      console.warn("Waiting for token and ID to be set before fetching...");
      return; // Prevent early API call
    }

    const fetchVehicles = async () => {
      try {
        console.log("Fetching vehicles for customer ID:", id);
        const response = await vehicleService.getVehicles(token, id);

        if (!response.ok) {
          setApiErrorMessage("Failed to fetch vehicles");
          return;
        }

        const data = await response.json();
        if (data && data.data) {
          setVehicles(data.data);
          setFilteredVehicles(data.data); // Initialize filtered vehicles
        }
      } catch (error) {
        setApiErrorMessage("Error fetching vehicles");
      }
    };

    fetchVehicles();
  }, [token, id]);

  // Handle search filtering
  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = vehicles.filter(vehicle =>
      vehicle.vehicle_year.toString().includes(lowerSearchTerm) ||
      vehicle.vehicle_make.toLowerCase().includes(lowerSearchTerm) ||
      vehicle.vehicle_model.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredVehicles(filtered);
  }, [searchTerm, vehicles]);

  return (
    <div className="container mt-4 mx-auto">
      {/* Vehicle Selection Section */}
      {apiErrorMessage && <h4>{apiErrorMessage}</h4>}
      <div className="card shadow-sm bg-white p-3">
        <h4 className="text-primary fw-bold mb-3">{vehicles.length > 0 ? "Choose a vehicle" : ""}</h4>
        
        {/* Search Filter Input */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder={vehicles.length > 0 ? "Search by Year, Make, or Model" : "No Vehicle found"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
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

export default VehiclePerCustomer;

