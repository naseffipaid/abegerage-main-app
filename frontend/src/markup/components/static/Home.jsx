import React from "react";
import Banner from "../../../assets/images/banner/banner.jpg"

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-white text-center py-1 mx-2 bg-danger" >
        <div >
          <h1 className="fw-bold text-white position-absolute top-50 start-50 translate-middle text-center">Tuneup Your Car to Next Level</h1>
          <p className=" position-absolute top-50 start-50 text-center   mt-5">Working since 1992</p>
          <img src={Banner} alt="Hero" className="img-fluid w-100" />
          <div className="mt-3">
            <button className="btn btn-danger me-3">Watch Intro Video</button>
            <button className="btn btn-light">About Us</button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src="/images/placeholder_2.png" alt="Experience" className="img-fluid rounded shadow-lg" />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold text-primary">We have 24 years experience</h2>
              <p className="text-muted">Providing expert car services with cutting-edge technology.</p>
              <button className="btn btn-danger">About Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h3 className="text-center fw-bold">Our Services</h3>
          <img src="/images/placeholder_3.png" alt="Services" className="img-fluid w-100 my-3" />
        </div>
      </section>

      {/* Customer Satisfaction Section */}
      <section className="py-5 text-white text-center" style={{ backgroundColor: "#EE0D09" }}>
        <div className="container">
          <h3 className="fw-bold">Quality Service And Customer Satisfaction!!</h3>
          <img src="/images/placeholder_4.png" alt="Satisfaction" className="img-fluid w-100 my-3" />
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold text-center">Additional Services</h3>
          <img src="/images/placeholder_5.png" alt="Additional Services" className="img-fluid w-100 my-3" />
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-4 text-white text-center" style={{ backgroundColor: "#0F0F0F" }}>
        <img src="/images/placeholder_6.png" alt="Footer" className="img-fluid w-100 my-3" />
        <h3>Schedule Your Appointment Today</h3>
        <h2 className="fw-bold">1800.456.7890</h2>
        <button className="btn btn-light">Contact Us</button>
      </section>
    </div>
  );
};

export default Home;
