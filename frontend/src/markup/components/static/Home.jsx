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
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from "../../../assets/images/banner/banner.jpg";
import MotterPart from "../../../assets/images/moterparts.webp";
import Speedometer from "../../../assets/images/speedometernew.png";
import tireImages from "../../../assets/images/tireImages.webp";
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
  const bannerStyle = {
    backgroundImage: `url(${Banner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    padding: '100px 0',
    minHeight: '25vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={bannerStyle}>
        <div style={overlayStyle}></div>
        <div className="container" style={contentStyle}>
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 fw-bold text-white">Tuneup Your Car <br />to Next Level</h1>
              <p className="lead mt-4">We have 24 years experience</p>
              <div className="mt-4">
                <button className="btn btn-danger btn-lg">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
<section className="about-us py-5" style={{ padding: '50px' }}>
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <img
          src={MotterPart}
          alt="About Us"
          className="img-fluid"
          style={{ height: '400px', objectFit: 'cover' }}
        />
      </div>
      <div className="col-md-6">
        <h2 style={{ fontWeight: 'bold' }}>
          Welcome to Our Workshop
        </h2>
        <h1 style={{ fontWeight: 'bold', fontSize: '3rem', marginTop: '1rem' }}>
          We have 24 years experience
        </h1>
        <hr style={{ borderTop: '3px solid #dc3545', width: '5rem', marginTop: '1rem' }} />
        <p style={{ marginTop: '1rem' }}>
          Bring to the table win-win survival strategies to ensure proactive domination. At the
          end of the day, going forward, a new normal that has evolved from generation X is on
          the runway heading towards a streamlined cloud solution. User generated content in
          real-time will have multiple touchpoints for offshoring.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.
          Override the digital divide with additional clickthroughs from DevOps. Nanotechnology
          immersion along the information highway will close the loop on focusing.
        </p>
        <Link to="/about" className="btn btn-danger mt-3" type="button">
          ABOUT US
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* Our Services Section */}
      <section className="our-services py-5" style={{ backgroundColor: '#f8f9fa', padding: '50px' }}>
        <div className="container">
          <h2 className="fw-bold text-center mb-4" style={{ color: '#333' }}>Our Services</h2>
          <div className="row">
            {[
              "Performance Upgrade",
              "Transmission Services",
              "Engine Service & Repair",
              "Tires & Brakes",
              "Denting & Painting",
              "Electrical Services",
              "Tuning & Performance",
              "Car Wash"
            ].map((service, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card" style={{ height: '200px' }}>
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold" style={{ color: '#333' }}>{service}</h5>
                    <Link to="#" className="text-danger mt-2 d-block">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Satisfaction Section */}
<section className="quality-satisfaction py-5" style={{
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '50px 20px',
}}>
  <div className="container">
    <div className="row align-items-center">
      {/* Left Side: Text Content */}
      <div className="col-md-6">
        <h2 className="fw-bold">Quality Service And <br /> Customer Satisfaction!!</h2>
        <p>
          We utilize the most recent symbiotic gear to ensure your vehicle is fixed or adjusted properly.
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="col-md-6 d-flex justify-content-center">
        <img
          src={Speedometer}
          alt="Quality Service"
          className="img-fluid"
          style={{
            maxWidth: '100%', // Make sure the image doesn't overflow
            height: 'auto', // Preserve the aspect ratio
            borderRadius: '10px', // Optional: Add rounded corners
          }}
        />
      </div>
    </div>
  </div>
</section>
       {/* why choose us section */}
       <div>
        <WhyChooseUs/>
       </div>
      {/* Leader Mechanical Section */}
      <section className="leader-mechanical py-5" style={{
        backgroundImage: `url(${tireImages})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '200px 50px', // Increased padding to make the section taller
        marginTop: '20px', // Added margin-top for gap
      }}>
        <div className="container text-center">
          <h2 className="fw-bold text-white">We are leader <br /> in Car Mechanical Work</h2>
          <button className="btn btn-danger mt-3">Watch Intro Video</button>
        </div>
      </section>

      {/* Bottom Call to Action */}
            <section className="py-4 mb-5 mt-5 mx-5" style={{ backgroundColor: "#e60000" }}> {/* Added margin-bottom (mb-5) */}
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

export default Home;