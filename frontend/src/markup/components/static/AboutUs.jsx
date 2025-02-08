import React from 'react';
import Banner from "../../../assets/images/banner/banner.jpg"; // Import your banner image
import MotterPart from "../../../assets/images/moterparts.webp";
import Differential from "../../../assets/images/differential.webp";
import tireImages from "../../../assets/images/tireImages.webp";
import { Link } from 'react-router-dom'; // Corrected import for react-router-dom v6

const AboutUs = () => {
  return (
    <section className="about-us-section">
      {/* First Section with Increased Banner Height */}
      <div className="bg-image-placeholder position-relative mb-5" style={{ height: '500px', backgroundColor: '#f0f0f0' }}>
        <img src={Banner} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h2 className="display-4 fw-bold mb-2 text-white">About Us</h2>
          <span className="small">
            <Link to="/" className="text-danger">Home</Link>
            <span className="mx-2"> &gt; </span>
            <span className="text-white">About Us</span>
          </span>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="section-title display-4 fw-bold mb-4">About Us</h2>
            <p>
              We are a team of highly skilled mechanics dedicated to providing top-notch car repair services. With years of experience, we ensure your vehicle receives the best care possible.
              <br /><br />
              Our commitment to quality workmanship and customer satisfaction drives us to deliver exceptional service every time. We use the latest technology and techniques to diagnose and fix any issue, big or small.
            </p>
            <div className="experience d-flex align-items-center mb-4">
              <div className="image-placeholder me-3" style={{ width: '100px', height: '100px', backgroundColor: '#ddd' }}>
                <img src={Differential} alt="Experience" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h3>We have 24 years experience</h3>
                <p className="text-muted">estd. 1998</p>
                <Link to="/" className="btn btn-danger mt-3" type="button">
                  Home
                </Link>
              </div>
            </div>
            <div className="why-choose-us mb-4">
              <h3>Why Choose Us</h3>
              <ul className="list-unstyled">
                <li><i className="fas fa-check-circle me-2 text-success"></i> Certified Expert Mechanics</li>
                <li><i className="fas fa-check-circle me-2 text-success"></i> Fast And Quality Service</li>
                <li><i className="fas fa-check-circle me-2 text-success"></i> Modern Workshop</li>
                <li><i className="fas fa-check-circle me-2 text-success"></i> Best Prices in Town</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bg-image-placeholder mb-4" style={{ width: '70%', backgroundColor: '#e0e0e0' }}>
              <img src={MotterPart} alt="Motor Part" style={{ width: '100%' }} />
            </div>
            <div className="additional-services mt-4">
              <h3>Additional Services</h3>
              <ul className="list-unstyled">
                <li><i className="fas fa-check-circle me-2 text-success"></i> General Maintenance & Repairs</li>
                <li><i className="fas fa-check-circle me-2 text-success"></i> Brake Services</li>
                <li><i className="fas fa-check-circle me-2 text-success"></i> Engine Diagnostics & Repair</li>
                <li><i className="fas fa-check-circle me-2 text-success"></i> Transmission Service</li>
                <li><i className="fas fa-check-circle me-2 text-success"></i> Electrical System Repair</li>
                <li><i className="fas fa-check-circle me-2 text-success"></i> Tire & Wheel Services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Leader Section */}
      <div className="leader-section py-5 text-white text-center position-relative mb-2" style={{ height: '400px', overflow: 'hidden' }}>
        <img
          src={tireImages}
          alt="Leader Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        <div
          className="overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        <div className="container position-relative" style={{ zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2 className="text-white">We are leader <br /> in Car Mechanical Work</h2>
          <Link to='/serviceDetail' className="btn btn-primary mt-3">Learn More</Link>
        </div>
      </div>

      {/* Appointment Section */}
      <div className="appointment-section py-5 bg-light text-center" style={{ marginTop: '100px' }}>
        <div className="container">
          <h2>Schedule Your Appointment Today</h2>
          <div className="contact-info">
            <span className="me-3">1800.456.7890</span>
            <span>|</span>
            <span className="ms-3">+1800-450 7890</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;