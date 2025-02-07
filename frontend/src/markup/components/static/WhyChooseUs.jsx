import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs'; // Example React Icon

const WhyChooseUs = () => {
  return (
    <div className="why-choose-us" style={{ 
      backgroundColor: '#f8f9fa', // Example background color
      padding: '40px', // Example padding
      fontFamily: 'Arial, sans-serif' // Example font family
    }}>
      <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}> {/* Example container styles */}
        <div className="row">
          <div className="col-md-6" style={{ paddingRight: '20px' }}> {/* Example column padding */}
            <h2 style={{ 
              color: '#333', // Example heading color
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Why Choose Us
            </h2>
            <div style={{ color: '#666', marginBottom: '30px' }}> {/* Example text color */}
              <p>Bring to the table win-win survival strategies to ensure proactive domination.</p>
              <p>At the end of the day, going forward, a new normal that has evolved from generation X is heading towards a streamlined cloud solution.</p>
            </div>
            <div className="reasons">
              <div className="reason" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px' 
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span style={{ fontWeight: 'bold' }}>Certified Expert Mechanics</span>
              </div>
              <div className="reason" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px' 
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span style={{ fontWeight: 'bold' }}>Fast And Quality Service</span>
              </div>
              <div className="reason" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px' 
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span style={{ fontWeight: 'bold' }}>Best Prices in Town</span>
              </div>
              <div className="reason" style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px' 
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span style={{ fontWeight: 'bold' }}>Awarded Workshop</span>
              </div>
            </div>
          </div>

          <div className="col-md-6" style={{ paddingLeft: '20px' }}> {/* Example column padding */}
            <h2 style={{ 
              color: '#333', // Example heading color
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Additional Services
            </h2>
            <div className="services" style={{ color: '#666' }}> {/* Example text color */}
              <div className="service" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px',
                  marginTop: '5px' // Align icon with text
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span>General Auto Repair & Maintenance</span>
              </div>
              <div className="service" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px',
                  marginTop: '5px' // Align icon with text
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span>Transmission Repair & Replacement</span>
              </div>
              <div className="service" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px',
                  marginTop: '5px' // Align icon with text
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span>Tire Repair and Replacement</span>
              </div>
              <div className="service" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px',
                  marginTop: '5px' // Align icon with text
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span>State Emissions Inspection</span>
              </div>
              <div className="service" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px',
                  marginTop: '5px' // Align icon with text
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span>Break Job/Break Services</span>
              </div>
              <div className="service" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px',
                  marginTop: '5px' // Align icon with text
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span>Electrical Diagnostics</span>
              </div>
              <div className="service" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px',
                  marginTop: '5px' // Align icon with text
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span>Fuel System Repairs</span>
              </div>
              <div className="service" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ 
                  color: '#dc3545', // Example icon color
                  marginRight: '10px',
                  marginTop: '5px' // Align icon with text
                }}>
                  <BsCheckCircleFill /> {/* Example React Icon */}
                </span>
                <span>Starting and Charging Repair</span>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;