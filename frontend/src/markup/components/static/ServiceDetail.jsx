import React from 'react';
import { Link } from 'react-router-dom';
import Differential from "../../../assets/images/differential.webp";
import Tool from "../../../assets/images/tools.png";


const ServiceDetail = () => {
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
                <h2 className="text-white display-4 fw-bold mb-5">Single Services</h2>
                <Link to='/' className="btn btn-primary btn-lg">Home</Link>
              </div>
            </div>

      {/* Sidebar Page Container */}
      <div className="sidebar-page-container ms-5">
        <div className="auto-container">
          <div className="row">
            {/* Content Side */}
            <div className="content-side col-xl-9 col-lg-8 order-lg-2">
              <div className="services-single">
                <div className="inner-box">
                  {/* <div className="big-image">
                    <img src={Tool} alt="tool" style={{width:'30%'}} />
                  </div> */}
                  <h2>Performance Upgrade</h2>
                  <div className="text">
                    <p>
                      Leverage agile frameworks to provide a robust synopsis for high level
                      overviews. Iterative approaches to corporate strategy foster collaborative
                      thinking to further the overall value proposition. Organically grow the
                      holistic world view of disruptive innovation via workplace diversity and
                      empowerment.
                    </p>
                    <p>
                      Bring to the table win-win survival strategies to ensure proactive domination.
                      At the end of the day, going forward, a new normal that has evolved from
                      generation X is on the runway heading towards a streamlined cloud solution.
                      User generated content in real-time will have multiple touchpoints for
                      offshoring. Capitalize on low hanging fruit to identify a ballpark value added
                      activity to beta test.
                    </p>
                    <div className="two-column">
                      <div className="row clearfix">
                        <div className="content-column col-md-6">
                          <div className="inner-column right-padd">
                            <h3>Benefit of Service</h3>
                            <p>
                              Expound the actual teachings of the great explorer of the truth, the
                              master-builder of human happiness. No one rejects, dislikes, or avoids
                              pleasure itself.
                            </p>
                            <ul className="list-style-four">
                              <li>Those who do not know how to pursue</li>
                              <li>Pleasure rationally encounter</li>
                              <li>Consequences that are extremely painful.</li>
                              <li>Nor again is there anyone who loves or pursues</li>
                            </ul>
                          </div>
                        </div>
                        <div className="image-column col-md-6">
                          <div className="image">
                            <img src={Tool} alt="tool" style={{width:'80%'}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="facts">
                    <h3>Some facts works with us</h3>
                    <div className="text">
                      Our management consulting services focus on our clients most critical issues
                      and opportunities strategy marketing organization operations, technology
                      transformation digital.
                    </div>
                  </div>

                  <div className="featured-blocks">
                    <div className="row">
                      {/* Featured Block */}
                      <div className="featured-block col-md-6">
                        <div className="featured-inner">
                          <div className="content">
                            <div className="icon-box">
                              <span className="icon flaticon-work-team"></span>
                            </div>
                            <h3>
                              <Link to="#">Professional Team</Link>
                            </h3>
                            <div className="text">
                              Leverage agile frameworks to provide a robust synopsis for high level
                              overviews. Iterative approaches.
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Featured Block */}
                      <div className="featured-block col-md-6">
                        <div className="featured-inner">
                          <div className="content">
                            <div className="icon-box">
                              <span className="icon flaticon-deadline"></span>
                            </div>
                            <h3>
                              <Link to="#">Delivery on Time</Link>
                            </h3>
                            <div className="text">
                              Leverage agile frameworks to provide a robust synopsis for high level
                              overviews. Iterative approaches.
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Featured Block */}
                      <div className="featured-block col-md-6">
                        <div className="featured-inner">
                          <div className="content">
                            <div className="icon-box">
                              <span className="icon flaticon-manufacture"></span>
                            </div>
                            <h3>
                              <Link to="#">Quality Products</Link>
                            </h3>
                            <div className="text">
                              Leverage agile frameworks to provide a robust synopsis for high level
                              overviews. Iterative approaches.
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Featured Block */}
                      <div className="featured-block col-md-6">
                        <div className="featured-inner">
                          <div className="content">
                            <div className="icon-box">
                              <span className="icon flaticon-badge"></span>
                            </div>
                            <h3>
                              <Link to="#">#1 Manufacturing Unit</Link>
                            </h3>
                            <div className="text">
                              Leverage agile frameworks to provide a robust synopsis for high level
                              overviews. Iterative approaches.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Accordian Boxed */}
                  <div className="accordian-boxed">
                    <h3>More information</h3>
                    <ul className="accordion-box style-three">
                      {/* Block */}
                      <li className="accordion block">
                        <div className="acc-btn">
                          <div className="icon-outer">
                            <span className="icon icon-plus fa fa-plus"></span>{' '}
                            <span className="icon icon-minus fa fa-minus"></span>
                          </div>
                          Capitalize on low hanging fruit to identify a ballpark value added activity.
                        </div>
                        <div className="acc-content">
                          <div className="content">
                            <div className="text">
                              Expound the actual teachings of the great explorer of the truth, the
                              master-builder of human happiness. No one rejects, dislikes, or avoids.
                              actual teachings of the great explorer of the truth, the master-builder of
                              human actual teachings of the great explorer of the truth, the master-builder
                              of human.
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* Block */}
                      <li className="accordion block">
                        <div className="acc-btn">
                          <div className="icon-outer">
                            <span className="icon icon-plus fa fa-plus"></span>{' '}
                            <span className="icon icon-minus fa fa-minus"></span>
                          </div>
                          Digital divide with additional clickthroughs from DevOps.
                        </div>
                        <div className="acc-content">
                          <div className="content">
                            <div className="text">
                              Expound the actual teachings of the great explorer of the truth, the
                              master-builder of human happiness. No one rejects, dislikes, or avoids.
                              actual teachings of the great explorer of the truth, the master-builder of
                              human actual teachings of the great explorer of the truth, the master-builder
                              of human.
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* Block */}
                      <li className="accordion block active-block">
                        <div className="acc-btn active">
                          <div className="icon-outer">
                            <span className="icon icon-plus fa fa-plus"></span>{' '}
                            <span className="icon icon-minus fa fa-minus"></span>
                          </div>
                          Nanotechnology immersion along the information highway will close the loop.
                        </div>
                        <div className="acc-content current">
                          <div className="content">
                            <div className="text">
                              Expound the actual teachings of the great explorer of the truth, the
                              master-builder of human happiness. No one rejects, dislikes, or avoids.
                              actual teachings of the great explorer of the truth, the master-builder of
                              human actual teachings of the great explorer of the truth, the master-builder
                              of human.
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* Block */}
                      <li className="accordion block">
                        <div className="acc-btn">
                          <div className="icon-outer">
                            <span className="icon icon-plus fa fa-plus"></span>{' '}
                            <span className="icon icon-minus fa fa-minus"></span>
                          </div>
                          Organically grow the holistic world view of disruptive innovation via workplace.
                        </div>
                        <div className="acc-content">
                          <div className="content">
                            <div className="text">
                              Expound the actual teachings of the great explorer of the truth, the
                              master-builder of human happiness. No one rejects, dislikes, or avoids.
                              actual teachings of the great explorer of the truth, the master-builder of
                              human actual teachings of the great explorer of the truth, the master-builder
                              of human.
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Side */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;