// import React from "react";
// import Banner from "../../../assets/images/banner/banner.jpg"

// const Home = () => {
//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="text-white text-center py-1 mx-2 bg-danger" >
//         <div >
//           <h1 className="fw-bold text-white position-absolute top-50 start-50 translate-middle text-center">Tuneup Your Car to Next Level</h1>
//           <p className=" position-absolute top-50 start-50 text-center   mt-5">Working since 1992</p>
//           <img src={Banner} alt="Hero" className="img-fluid w-100" />
//           <div className="mt-3">
//             <button className="btn btn-danger me-3">Watch Intro Video</button>
//             <button className="btn btn-light">About Us</button>
//           </div>
//         </div>
//       </section>

//       {/* Experience Section */}
//       <section className="py-5">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-6">
//               <img src="/images/placeholder_2.png" alt="Experience" className="img-fluid rounded shadow-lg" />
//             </div>
//             <div className="col-md-6">
//               <h2 className="fw-bold text-primary">We have 24 years experience</h2>
//               <p className="text-muted">Providing expert car services with cutting-edge technology.</p>
//               <button className="btn btn-danger">About Us</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-5 bg-light">
//         <div className="container">
//           <h3 className="text-center fw-bold">Our Services</h3>
//           <img src="/images/placeholder_3.png" alt="Services" className="img-fluid w-100 my-3" />
//         </div>
//       </section>

//       {/* Customer Satisfaction Section */}
//       <section className="py-5 text-white text-center" style={{ backgroundColor: "#EE0D09" }}>
//         <div className="container">
//           <h3 className="fw-bold">Quality Service And Customer Satisfaction!!</h3>
//           <img src="/images/placeholder_4.png" alt="Satisfaction" className="img-fluid w-100 my-3" />
//         </div>
//       </section>

//       {/* Additional Services Section */}
//       <section className="py-5">
//         <div className="container">
//           <h3 className="fw-bold text-center">Additional Services</h3>
//           <img src="/images/placeholder_5.png" alt="Additional Services" className="img-fluid w-100 my-3" />
//         </div>
//       </section>

//       {/* Footer Section */}
//       <section className="py-4 text-white text-center" style={{ backgroundColor: "#0F0F0F" }}>
//         <img src="/images/placeholder_6.png" alt="Footer" className="img-fluid w-100 my-3" />
//         <h3>Schedule Your Appointment Today</h3>
//         <h2 className="fw-bold">1800.456.7890</h2>
//         <button className="btn btn-light">Contact Us</button>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from "../../../assets/images/banner/banner.jpg"; // Import your banner image
// import QualityImage from "../../../assets/images/quality.jpg"; // Import quality image
// import MechanicalImage from "../../../assets/images/mechanical.jpg"; // Import mechanical image


const Home = () => {
  const bannerStyle = {
    backgroundImage: `url(${Banner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff', // Adjust text color for contrast
    padding: '100px 0',
    // Add a fallback background color in case the image fails to load
    backgroundColor: '#333', // Or any other dark color
  };

  return (
    <div>
      {/* Section 1: Hero Section (with background image and fallback) */}
      <section className="hero-section py-5" style={bannerStyle}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 fw-bold">Tuneup Your Car <br />to Next Level</h1>
              <p className="lead mt-4">We have 24 years experience</p>
              <div className="mt-4">
                <button className="btn btn-danger btn-lg">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: About Us */}
      <section className="about-us py-5" style={{ padding: '50px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={Banner} // Or a different appropriate image for "About Us"
                alt="About Us"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold" style={{ color: '#333' }}>We have 24 years experience</h2>
              <p className="mt-4" style={{ color: '#555' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nulla nec orci tristique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Services (Added - Card layout from screenshot) */}
      <section className="our-services py-5" style={{ backgroundColor: '#f8f9fa', padding: '50px' }}>
        <div className="container">
          <h2 className="fw-bold text-center mb-4" style={{ color: '#333' }}>Our Services</h2>
          <div className="row">
            <div className="col-md-3 mb-4"> {/* 4 columns per row */}
              <div className="card">
                <div className="card-body text-center"> {/* Centered content */}
                  <h5 className="card-title fw-bold" style={{ color: '#333' }}>Performance Upgrade</h5>
                  {/* No image in this card */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold" style={{ color: '#333' }}>Transmission Services</h5>
                  {/* No image in this card */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold" style={{ color: '#333' }}>Engine Service & Repair</h5>
                  {/* No image in this card */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold" style={{ color: '#333' }}>Tires & Brakes</h5>
                  {/* No image in this card */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold" style={{ color: '#333' }}>Tuning & Performance</h5>
                  {/* No image in this card */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold" style={{ color: '#333' }}>Electrical Services</h5>
                  {/* No image in this card */}
                </div>
              </div>
            </div>
            {/* ... (Repeat similar structure for other services if needed) */}
          </div>
        </div>
      </section>

      {/* Section 4: Quality and Satisfaction */}
      <section className="quality-satisfaction py-5" style={{ padding: '50px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="fw-bold" style={{ color: '#333' }}>Quality Service And <br /> Customer Satisfaction!!</h2>
            </div>
            <div className="col-md-6">
              <img
                src="#" // Use your imported quality image
                alt="Quality"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Choose Us */}
      <section className="why-choose-us py-5" style={{ backgroundColor: '#f8f9fa', padding: '50px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="fw-bold" style={{ color: '#333' }}>Why Choose Us</h2>
              {/* Add icons and text for each reason */}
              <ul>
                <li>Expert Mechanics</li>
                <li>Fast and Friendly Service</li>
                <li>Affordable Prices</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold" style={{ color: '#333' }}>Additional Services</h2>
              {/* Add list of additional services */}
              <ul>
                <li>Car Wash</li>
                <li>Oil Change</li>
                <li>AC Repair</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Leader in Mechanical Work */}
      <section className="leader-mechanical py-5" style={{ padding: '50px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="fw-bold text-center" style={{ color: '#333' }}>We are leader <br /> in Car Mechanical Work</h2>
              <img
                src="" // Use your imported mechanical image
                alt="Mechanical Work"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4" style={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}>
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Car Service. All rights reserved.</p>
          <p>Schedule Your Appointment Today: 1800.456.7890</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;