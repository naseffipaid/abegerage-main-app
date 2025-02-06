import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import serviceService from '../../../services/service.services';
import { useAuth } from '../../../context/AuthContext';

const EditService = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState(null);
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const { employee } = useAuth();
    const token = employee?.employee_token || '';

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await serviceService.getSingleService(token, serviceId);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch service data.");
                }
                const data = await response.json();

                if (data && data.data) { // No need to check for array here, API should return single object
                    console.log("Fetched Service Data:", data.data);
                    setServiceData(data.data);
                } else {
                    console.error("Invalid data format received:", data);
                    setServerError("Invalid service data received.");
                    setLoading(false);
                    return;
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching service:", error);
                setServerError(error.message);
                setLoading(false);
            }
        };

        if (serviceId && token) {
            fetchServiceData();
        }
    }, [serviceId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await serviceService.updateService(serviceId, serviceData, token);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update service.");
            }

            console.log('Service updated successfully');
            setSuccess(true);
            setServerError('');
            navigate('/admin/services'); // Navigate back to services page
        } catch (error) {
            console.error("Error updating service:", error);
            setServerError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (serverError) {
        return <div className="alert alert-danger">{serverError}</div>;
    }

    if (!serviceData) {
        return <div>Loading service details...</div>;
    }

    return (
        <div className="container mt-4 w-100">
            <div className="card shadow-lg p-4 ms-0 w-100" style={{ maxWidth: '700px' }}>
                <h4 className="text-primary mb-3">Edit Service</h4>
                <hr className="border-danger" style={{ width: '20%' }} />

                {success && <div className="alert alert-success">Service updated successfully!</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Service Name</label> {/* Added label */}
                        <input
                            type="text"
                            className="form-control"
                            name="service_name"
                            value={serviceData.service_name || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Service Description</label> {/* Added label */}
                        <textarea
                            className="form-control"
                            rows="4"
                            name="service_description"
                            value={serviceData.service_description || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-danger w-100">Update Service</button>
                </form>
            </div>
        </div>
    );
};

export default EditService;