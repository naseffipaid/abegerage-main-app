import React from 'react';
import { Link } from 'react-router-dom';
import Differential from "../../../assets/images/differential.webp";

const Services = () => {
  return (
    <div className="page-wrapper">
      {/* Banner Section */}
      <div
        className="leader-section text-white text-center position-relative"
        style={{
          height: '500px', // Increased height
          overflow: 'hidden', // Ensure the image doesn't overflow
        }}
      >
        {/* Background Image */}
        <img
          src={Differential}
          alt="Leader Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensure the image covers the entire container
            zIndex: 0,
          }}
        />
        {/* Overlay */}
        <div
          className="overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
            zIndex: 1,
          }}
        />
        {/* Content */}
        <div
          className="container position-relative d-flex flex-column justify-content-center align-items-center"
          style={{ zIndex: 2, height: '100%' }} // Center content vertically and horizontally
        >
          <h2 className="text-white display-4 fw-bold mb-4">Services</h2>
          <Link to='/serviceDetail' className="btn btn-primary btn-lg">Learn More</Link>
        </div>
      </div>

      {/* Services Section */}
      <section className="services-section style-three py-5">
        <div className="auto-container">
          <div className="sec-title style-two text-center mb-5">
            <h2 className="display-5 fw-bold">Services that we offer</h2>
            <div className="text mt-3">
              Bring to the table win-win survival strategies to ensure proactive domination.
              At the end of the day, going forward, a new normal that has evolved from generation X is on the runway
              heading towards a streamlined cloud solution.
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 service-block-one mb-4">
              <div className="inner-box hvr-float-shadow p-4">
                <h5>Service and Repairs</h5>
                <h2>Performance Upgrade</h2>
                <Link to="/serviceDetail" className="read-more d-block mt-3">
                  read more +
                </Link>
                <div className="icon mt-3">
                  <span className="flaticon-power"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one mb-4">
              <div className="inner-box hvr-float-shadow p-4">
                <h5>Service and Repairs</h5>
                <h2>Transmission Services</h2>
                <Link to="/serviceDetail" className="read-more d-block mt-3">
                  read more +
                </Link>
                <div className="icon mt-3">
                  <span className="flaticon-gearbox"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one mb-4">
              <div className="inner-box hvr-float-shadow p-4">
                <h5>Service and Repairs</h5>
                <h2>Break Repair & Service</h2>
                <Link to="/serviceDetail" className="read-more d-block mt-3">
                  read more +
                </Link>
                <div className="icon mt-3">
                  <span className="flaticon-brake-disc"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one mb-4">
              <div className="inner-box hvr-float-shadow p-4">
                <h5>Service and Repairs</h5>
                <h2>Engine Service & Repair</h2>
                <Link to="/serviceDetail" className="read-more d-block mt-3">
                  read more +
                </Link>
                <div className="icon mt-3">
                  <span className="flaticon-car-engine"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one mb-4">
              <div className="inner-box hvr-float-shadow p-4">
                <h5>Service and Repairs</h5>
                <h2>Tyre & Wheels</h2>
                <Link to="/serviceDetail" className="read-more d-block mt-3">
                  read more +
                </Link>
                <div className="icon mt-3">
                  <span className="flaticon-tire"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one mb-4">
              <div className="inner-box hvr-float-shadow p-4">
                <h5>Service and Repairs</h5>
                <h2>Denting & Painting</h2>
                <Link to="/serviceDetail" className="read-more d-block mt-3">
                  read more +
                </Link>
                <div className="icon mt-3">
                  <span className="flaticon-spray-gun"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one mb-4">
              <div className="inner-box hvr-float-shadow p-4">
                <h5>Service and Repairs</h5>
                <h2>Air Conditioning Evac</h2>
                <Link to="/serviceDetail" className="read-more d-block mt-3">
                  read more +
                </Link>
                <div className="icon mt-3">
                  <span className="flaticon-air-conditioning"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one mb-4">
              <div className="inner-box hvr-float-shadow p-4">
                <h5>Service and Repairs</h5>
                <h2>General Service & Washing</h2>
                <Link to="/serviceDetail" className="read-more d-block mt-3">
                  read more +
                </Link>
                <div className="icon mt-3">
                  <span className="flaticon-car-service"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;