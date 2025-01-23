import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import serviceService from '../../../services/service.services';


const Services = () => {
    const [services, setServices] = useState([]);
    const [newServiceName, setNewServiceName] = useState('');
    const [newServiceDescription, setNewServiceDescription] = useState('');

    // Errors
    const [newServiceNameRequired, setNewServiceNameRequired] = useState('');
    const [newServiceDescriptionRequired, setNewServiceDescriptionRequired] = useState('');
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState('');
    const [fetchinError , setFetchingError] = useState();

    // Auth context
    const { employee } = useAuth();
    const loggedInEmployeeToken = employee?.employee_token || ''; // Safe navigation
    
    console.log("services is",services)
    // Fetch services using useEffect
    useEffect(() => { 
        if(!loggedInEmployeeToken) {
            return;
        } 
        serviceService.getServices(loggedInEmployeeToken)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setFetchingError(data.error);
                } else {
                    setServices(data.data);
                }
            })
            .catch((error) => {
                const resMessage = (error.response?.data?.message) || error.message || error.toString();
                setFetchingError(resMessage);
            });
    }, [loggedInEmployeeToken]);



    const handleAddService = () => {
        let valid = true;

        if (!newServiceName) {
            setNewServiceNameRequired('Service name is required');
            valid = false;
        } else {
            setNewServiceNameRequired('');
        }

        if (!newServiceDescription) {
            setNewServiceDescriptionRequired('Description is required');
            valid = false;
        } else {
            setNewServiceDescriptionRequired('');
        }

        if (!valid) {
            return;
        }

        const formData = {
            service_name: newServiceName, // Correct property name to match backend (likely 'name')
            service_description: newServiceDescription,
        };

        serviceService.addService(formData, loggedInEmployeeToken)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setServerError(data.error);
                } else {
                    console.log("Service created:", data);
                    setSuccess(true);
                    setServerError('');
                    // Update the services list with the new service
                    setNewServiceName('');
                    setNewServiceDescription('');
                }
            })
            .catch((error) => {
                const resMessage = (error.response?.data?.message) || error.message || error.toString();
                setServerError(resMessage);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Services we provide</h2>
            <div className="row">
                <div className="col">
                    {fetchinError && <div className="alert alert-danger">{fetchinError}</div>}
                    {services.length > 0 ? ( // Check if services array has items
                        services.map((service, index) => (
                            <div key={index} className="mb-3 p-3 border rounded">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h3 className="mb-1 fs-6">{service.service_name}</h3>
                                        <p className="mb-0 small">{service.service_description}</p>
                                    </div>
                                    <div className="d-flex mx-2">
                                        <a href="#" className="">
                                            <FaPencilAlt style={{ cursor: 'pointer' }} />
                                        </a>
                                        <a href="#" className="ms-2">
                                            <FaTrashAlt style={{ cursor: 'pointer' }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='mb-4 fw-bold fs-3'>No Services Please Add Service</div>
                    )}

                    <div className="border rounded p-3">
                        <h3>Add a new service</h3>
                        {serverError && <div className="alert alert-danger">{serverError}</div>} {/* Display server errors */}
                        {success && <div className="alert alert-success">Service added successfully!</div>}
                        <div className="mb-3">
                            <label className="form-label">Service name</label>
                            <input
                                type="text"
                                className="form-control w-50"
                                value={newServiceName}
                                onChange={(e) =>{ setNewServiceName(e.target.value);
                                    setSuccess(false)}
                                }
                            />
                            {newServiceNameRequired && <div className="text-danger">{newServiceNameRequired}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Service description</label>
                            <textarea
                                className="form-control w-50"
                                rows="4"
                                value={newServiceDescription}
                                    onChange={(e) =>{ setNewServiceDescription(e.target.value); setSuccess(false)}}
                            />
                            {newServiceDescriptionRequired && <div className="text-danger">{newServiceDescriptionRequired}</div>}
                        </div>
                        <button className="btn btn-danger" onClick={handleAddService}>ADD SERVICE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;