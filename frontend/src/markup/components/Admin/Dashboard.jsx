import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaListAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import { FaPaintBrush } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const cardStyle = {
    borderBottom: '3px solid #dc3545',
    marginBottom: '20px',
    padding: '20px',
    height: '100%', // Maintain equal height
    position: 'relative' // For absolute positioning of the icon
  };

  const iconStyle = {
    position: 'absolute',
    bottom: '20px',  // Adjust as needed
    right: '20px',   // Adjust as needed
    color: '#6c757d'
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      {/* ... (rest of the code is the same) */}

      <div className="row">
        {/* ... (card layout) */}
        <div className="col-md-4">
          <div className="card" style={cardStyle}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#343a40' }}>All Orders</h3>
              <Link to="/admin/orders" style={{ color: '#dc3545' }}>
                LIST OF ORDERS +
              </Link>
              <FaListAlt size={40} style={iconStyle} /> {/* Icon at bottom right */}
            </div>
          </div>
        </div>

        {/* ... (repeat similar structure for all other cards, replacing the Fa* component and adjusting the to= prop of the Link component as appropriate) */}

        <div className="col-md-4">
          <div className="card" style={cardStyle}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#343a40' }}>New Orders</h3>
              <Link to="/admin/order" style={{ color: '#dc3545' }}>
                ADD ORDER +
              </Link>
              <FaPlus size={40} style={iconStyle} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card" style={cardStyle}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#343a40' }}>Employees</h3>
              <Link to="/admin/employees" style={{ color: '#dc3545' }}>
                LIST OF EMPLOYEES +
              </Link>
              <FaUsers size={40} style={iconStyle} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card" style={cardStyle}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#343a40' }}>Add Employee</h3>
              <Link to="/admin/add-employee" style={{ color: '#dc3545' }}>
                ADD EMPLOYEES +
              </Link>
              <FaPlus size={40} style={iconStyle} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card" style={cardStyle}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#343a40' }}>Customers</h3>
              <Link to="/admin/customers" style={{ color: '#dc3545' }}>
                LIST OF CUSTOMERS +
              </Link>
              <FaUsers size={40} style={iconStyle} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card" style={cardStyle}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#343a40' }}>Add Customers</h3>
              <Link to="/admin/add-customer" style={{ color: '#dc3545' }}>
                ADD CUSTOMERS +
              </Link>
              <FaPlus size={40} style={iconStyle} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card" style={cardStyle}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#343a40' }}>Services</h3>
              <Link to="/admin/services" style={{ color: '#dc3545' }}>
                SERVICES 
              </Link>
              <FaPaintBrush size={40} style={iconStyle} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card" style={cardStyle}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#343a40' }}>Engine Service & Repair</h3>
              <Link to="/serviceDetail" style={{ color: '#dc3545' }}>
                READ MORE +
              </Link>
              <FaCog size={40} style={iconStyle} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card" style={cardStyle}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#343a40' }}>Tyre & Wheels</h3>
              <Link to="/serviceDetail" style={{ color: '#dc3545' }}>
                READ MORE +
              </Link>
              <FaCar size={40} style={iconStyle} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;