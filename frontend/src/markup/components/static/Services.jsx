import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="page-wrapper">
      {/* 
        Header and Footer components have been removed since they are provided elsewhere.
        CSS and Bootstrap are assumed to be imported in your main.jsx.
      */}

      {/* Page Title Section */}
      <section
        className="page-title"
        style={{ backgroundImage: 'url(assets/images/background/bg-3.jpg)' }}
      >
        <div className="auto-container">
          <h2>Services</h2>
          <ul className="page-breadcrumb">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>Services</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>

      {/* Services Section */}
      <section className="services-section style-three">
        <div className="auto-container">
          <div className="sec-title style-two">
            <h2>Services that we offer</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive domination.
              At the end of the day, going forward, a new normal that has evolved from generation X is on the runway
              heading towards a streamlined cloud solution.
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Performance Upgrade</h2>
                {/* Link to serviceDetail route */}
                <Link to="/serviceDetail" className="read-more">
                  read more +
                </Link>
                <div className="icon">
                  <span className="flaticon-power"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Transmission Services</h2>
                <Link to="/serviceDetail" className="read-more">
                  read more +
                </Link>
                <div className="icon">
                  <span className="flaticon-gearbox"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Break Repair & Service</h2>
                <Link to="/serviceDetail" className="read-more">
                  read more +
                </Link>
                <div className="icon">
                  <span className="flaticon-brake-disc"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Engine Service & Repair</h2>
                <Link to="/serviceDetail" className="read-more">
                  read more +
                </Link>
                <div className="icon">
                  <span className="flaticon-car-engine"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Tyre & Wheels</h2>
                <Link to="/serviceDetail" className="read-more">
                  read more +
                </Link>
                <div className="icon">
                  <span className="flaticon-tire"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Denting & Painting</h2>
                <Link to="/serviceDetail" className="read-more">
                  read more +
                </Link>
                <div className="icon">
                  <span className="flaticon-spray-gun"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Air Conditioning Evac</h2>
                <Link to="/serviceDetail" className="read-more">
                  read more +
                </Link>
                <div className="icon">
                  <span className="flaticon-air-conditioning"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>General Service & Washing</h2>
                <Link to="/serviceDetail" className="read-more">
                  read more +
                </Link>
                <div className="icon">
                  <span className="flaticon-car-service"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{ backgroundImage: 'url(assets/images/background/bg-1.jpg)' }}
        ></div>
        <div className="auto-container">
          <h5>Working since 1992</h5>
          <h2>
            We are leader <br /> in Car Mechanical Work
          </h2>
          <div className="video-box">
            <div className="video-btn">
              {/* This Link could open a lightbox or route as needed */}
              <Link
                to="#"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <i className="flaticon-play"></i>
              </Link>
            </div>
            <div className="text">
              Watch intro video <br /> about us
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;