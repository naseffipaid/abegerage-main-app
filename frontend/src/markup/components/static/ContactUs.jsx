import React from "react";
import { Link } from "react-router-dom";
import tireImages from "../../../assets/images/tireImages.webp";
import Detailed from "../../../assets/images/differential.webp";

const ContactUs = () => {
  return (
    <div className="container-fluid px-0">
      {/* Hero Section with Banner Background */}
      <section
        className="d-flex align-items-end"
        style={{
          backgroundImage: `url('${tireImages}')`, // Replace with actual path
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px", // Adjust height as needed
          paddingBottom: "30px", // Positions text lower
        }}
      >
        <div className="container">
          <h1 className="text-white">Contact Us</h1>
          <nav>
            <Link to="/" className="me-2" style={{ color: "red" }}>
              Home
            </Link>
            <span style={{ color: "brown" }}>About Us</span>
          </nav>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-5 bg-white mb-5"> {/* Added margin-bottom (mb-5) for spacing before footer */}
        <div className="container">
          <div className="row align-items-center">
            {/* Map Section */}
            <div className="col-md-6 mb-4 mb-md-0"> {/* Added margin-bottom for mobile */}
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.2349310524984!2d-77.04238548471738!3d38.90417957957081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7b897f8c515%3A0x5d1f4c2b70b7a489!2sAutoserv!5e0!3m2!1sen!2sus!4v1643220927463!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Contact Information */}
            <div className="col-md-6 ps-md-4"> {/* Added padding-left for spacing */}
              <h3 className="fw-bold">Our Address</h3>
              <p className="text-muted">
                Completely synergize resource-taxing relationships via premier niche markets.
                Professionally cultivate one-to-one customer service.
              </p>
              <div className="mb-3">
                <strong className="text-primary">
                  <i className="fas fa-map-marker-alt me-2"></i>Address:
                </strong>
                <p className="mb-0">54B, Tailstoi Town 5238 MT, La City, IA 5224</p>
              </div>
              <div className="mb-3">
                <strong className="text-primary">
                  <i className="fas fa-envelope me-2"></i>Email:
                </strong>
                <p className="mb-0">
                  <a href="mailto:contact@buildtruck.com" className="text-dark text-decoration-none">
                    contact@buildtruck.com
                  </a>
                </p>
              </div>
              <div className="mb-3">
                <strong className="text-primary">
                  <i className="fas fa-phone-alt me-2"></i>Phone:
                </strong>
                <p className="mb-0">1800 456 7890 / 1254 897 3654</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="py-4 mb-5" style={{ backgroundColor: "#e60000" }}> {/* Added margin-bottom (mb-5) */}
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between ">
          <div>
            <h4 className="text-white fw-bold mb-0">Schedule Your Appointment Today</h4>
            <p className="text-white mb-0">Your Automotive Repair & Maintenance Service Specialist</p>
          </div>
          <div className="d-flex align-items-center">
            <h2 className="text-white fw-bold me-3">1800.456.7890</h2>
            <Link to="/contact" className="btn btn-light text-danger px-4">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;