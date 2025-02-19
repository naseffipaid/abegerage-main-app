// import React from 'react';
// // Import the Link component from react-router-dom 
// import { Link } from 'react-router-dom'
// // Import the logo image 
// import logo from '../../../assets/images/logo.png';
// // Import the login service to access the logout function
// import loginService from '../../../services/login.services';
// // Import the custom context hook 
// import { useAuth } from '../../../context/AuthContext';

// function Header() {
//   // Use the custom hook to access the data in the context 
//   const { isLogged, setIsLogged, employee } = useAuth();
//   // console.log(useAuth());

//   // Log out event handler function
//   const logOut = () => {
//     // Call the logout function from the login service 
//     loginService.logOut();
//     // Set the isLogged state to false 
//     setIsLogged(false);
//   }

//   return (
//     <div>
//       <header className="main-header header-style-one">
//         <div className="header-top">
//           <div className="auto-container">
//             <div className="inner-container">
//               <div className="left-column">
//                 <div className="text">Enjoy the Beso while we fix your car</div>
//                 <div className="office-hour">Monday - Saturday 7:00AM - 6:00PM</div>
//               </div>
//               <div className="right-column">
//                 {isLogged ? (
//                   <div className="link-btn">
//                     <div className="phone-number"><strong>Welcome {employee?.employee_first_name}</strong></div>
//                   </div>
//                 ) : (
//                   <div className="phone-number">Schedule Appointment: <strong>1800 456 7890</strong> </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="header-upper">
//           <div className="auto-container">
//             <div className="inner-container">
//               <div className="logo-box">
//                 <div className="logo"><Link to="/"><img src={logo} alt="" /></Link>
//                 </div>
//               </div>
//               <div className="right-column">
//                 <div className="nav-outer">
//                   <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" />
//                   </div>
//                   <nav className="main-menu navbar-expand-md navbar-light">
//                     <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
//                       <ul className="navigation">
//                         <li className="dropdown"><Link to="/">Home</Link></li>
//                         <li className="dropdown"><Link to="/about">About Us</Link></li>
//                         <li className="dropdown"><Link to="/services">Services</Link></li>
//                         <li><Link to="/contact">Contact Us</Link></li>

//                         {/* ✅ Added Admin & Check Status Links */}
//                         <li><Link to="/admin">Admin</Link></li>
//                         <li><Link to="/check-status">Check Status</Link></li>

//                       </ul>
//                     </div>
//                   </nav>
//                 </div>
//                 <div className="search-btn"></div>
//                 {isLogged ? (
//                   <div className="link-btn">
//                     <Link to="/" className="theme-btn btn-style-one blue" onClick={logOut} >Log out</Link>
//                   </div>
//                 ) : (
//                   <div className="link-btn">
//                     <Link to="/login" className="theme-btn btn-style-one">Login</Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="sticky-header">
//           <div className="header-upper">
//             <div className="auto-container">
//               <div className="inner-container">
//                 <div className="logo-box">
//                   <div className="logo"><Link to="/"><img src="assets/images/custom/logo.png" alt="" /></Link>
//                   </div>
//                 </div>
//                 <div className="right-column">
//                   <div className="nav-outer">
//                     <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" />
//                     </div>

//                     <nav className="main-menu navbar-expand-md navbar-light">
//                     </nav>
//                   </div>
//                   <div className="search-btn"></div>
//                   <div className="link-btn"><Link to="/login" className="theme-btn btn-style-one">Login</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mobile-menu">
//           <div className="menu-backdrop"></div>
//           <div className="close-btn"><span className="icon flaticon-remove"></span></div>

//           <nav className="menu-box">
//             <div className="nav-logo"><Link to="index.html">
//               <img src="assets/images/logo-two.png" alt=""
//                 title="" /></Link></div>
//             <div className="menu-outer">
//             </div>
//           </nav>
//         </div>

//         <div className="nav-overlay">
//           <div className="cursor"></div>
//           <div className="cursor-follower"></div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import loginService from '../../../services/login.services';
import { useAuth } from '../../../context/AuthContext';


function Header() {
  const { isLogged, setIsLogged, employee } = useAuth();

  const logOut = () => {
    loginService.logOut();
    setIsLogged(false);
  };

  return (
    <div>
      <header className="main-header header-style-one">
        {/* Header Top Section */}
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">Enjoy the Beso while we fix your car</div>
                <div className="office-hour">Monday - Saturday 7:00AM - 6:00PM</div>
              </div>
              <div className="right-column">
                {isLogged ? (
                  <div className="link-btn">
                    <div className="phone-number">
                      <strong>Welcome {employee?.employee_first_name}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="phone-number">
                    Schedule Appointment: <strong>1800 456 7890</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Header Upper Section */}
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container d-flex align-items-center justify-content-between">
              {/* Logo */}
              <div className="logo-box">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="Logo" />
                  </Link>
                </div>
              </div>

              <div className="right-column">
                {/* Desktop Navigation */}
                <nav className="d-none d-md-block">
                  <ul className="navigation">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/check-status">Check Status</Link></li>
                  </ul>
                </nav>

                {/* Mobile Navigation */}
                <div className="d-block d-md-none mobile-nav">
                  <div className="mobile-menu-grid">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/check-status">Check Status</Link>
                  </div>

                  {/* Mobile Display for Username & Office Hours */}
                  <div className="mobile-info">
                    {isLogged && <strong>Welcome {employee?.employee_first_name}</strong>}
                    <div className="office-hour">Monday - Saturday 7:00AM - 6:00PM</div>
                  </div>

                  <div className="login-btn-container">
                    {isLogged ? (
                      <Link to="/" className="theme-btn btn-style-one blue" onClick={logOut}>
                        Log out
                      </Link>
                    ) : (
                      <Link to="/login" className="theme-btn btn-style-one">
                        Login
                      </Link>
                    )}
                  </div>
                </div>

                {/* Desktop Login/Logout Button */}
                <div className="link-btn d-none d-md-block">
                  {isLogged ? (
                    <Link to="/" className="theme-btn btn-style-one blue" onClick={logOut}>
                      Log out
                    </Link>
                  ) : (
                    <Link to="/login" className="theme-btn btn-style-one">
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
