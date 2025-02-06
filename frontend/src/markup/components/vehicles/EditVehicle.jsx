import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import vehicleService from '../../../services/vehicles.services';
import { useAuth } from '../../../context/AuthContext';

const EditVehicle = () => {
    const { vehicleId } = useParams();
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState(null);
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const { employee } = useAuth();
    const token = employee?.employee_token || '';

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await vehicleService.getSingleVehicle(token, vehicleId);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch vehicle data.");
                }
                const data = await response.json();
                console.log("Fetched Vehicle Data:", data.data);
                setVehicleData(data?.data[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vehicle:", error);
                setServerError(error.message);
                setLoading(false);
            }
        };

        if (vehicleId && token) {
            fetchVehicleData();
        }
    }, [vehicleId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await vehicleService.updateVehicle(vehicleId, vehicleData, token);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update vehicle.");
            }

            console.log('Vehicle updated successfully');
            setSuccess(true);
            setServerError('');
            navigate(`/admin/customers/${vehicleData.customer_id}`);
        } catch (error) {
            console.error("Error updating vehicle:", error);
            setServerError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (serverError) {
        return <div className="alert alert-danger">{serverError}</div>;
    }

    if (vehicleData) {
        return (
            <div className="container mt-4 w-100">
                <div className="card shadow-lg p-4 ms-0 w-100" style={{ maxWidth: '700px' }}>
                    <h4 className="text-primary mb-3">Edit Vehicle</h4>
                    <hr className="border-danger" style={{ width: '20%' }} />

                    {success && <div className="alert alert-success">Vehicle updated successfully!</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="vehicle_year" value={vehicleData.vehicle_year || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="vehicle_make" value={vehicleData.vehicle_make || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="vehicle_model" value={vehicleData.vehicle_model || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="vehicle_type" value={vehicleData.vehicle_type || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="vehicle_mileage" value={vehicleData.vehicle_mileage || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="vehicle_tag" value={vehicleData.vehicle_tag || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="vehicle_serial" value={vehicleData.vehicle_serial || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="vehicle_color" value={vehicleData.vehicle_color || ''} onChange={handleChange} />
                        </div>

                        <button type="submit" className="btn btn-danger w-100">Update Vehicle</button>
                    </form>
                </div>
            </div>
        );
    } else {
        return <div>Loading vehicle details...</div>;
    }
};

export default EditVehicle;