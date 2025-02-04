// Import React, the useState and useEffect hooks 
// import React, { useState, useEffect } from "react";
// // Import PropTypes for prop validation
// import PropTypes from "prop-types";
// // Import the Route and Navigate components  
// import { Navigate } from "react-router-dom";
// // Import the Util function we created to handle the reading from the local storage 
// import getAuth from '../../../util/Auth';

// const PrivateAuthRoute = ({ roles, children }) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [isLogged, setIsLogged] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     // Retrieve the logged in user from local storage
//     const loggedInEmployee = getAuth();
//     // console.log(loggedInEmployee);
//     loggedInEmployee.then((response) => {
//       if (response.employee_token) {
//         // If in here, that means the user is logged in 
//         // console.log(response);
//         // console.log("Set logged in to true");
//         setIsLogged(true);
//         if (roles && roles.length > 0 && roles.includes(response.employee_role)) {
//           // If in here, that means the user is logged and has  authorization to access the route 
//           // console.log("Set authorized to true");
//           setIsAuthorized(true);
//         }
//       }
//       setIsChecked(true);
//     });
//   }, [roles]);
//   if (isChecked) {
//     if (!isLogged) {
//       return <Navigate to="/login" />;
//     }
//     if (!isAuthorized) {
//       return <Navigate to="/unauthorized" />;
//     }
//   }

//   return children;
// };
// PrivateAuthRoute.propTypes = {
//     children: PropTypes.node.isRequired,
//     roles: PropTypes.array,
//   }

// export default PrivateAuthRoute;

// // import React, { useState, useEffect } from "react";
// // // Import PropTypes for prop validation
// // import PropTypes from "prop-types";
// // // Import the Navigate component
// // import { Navigate } from "react-router-dom";
// // // Import the Util function we created to handle the reading from local storage
// // import getAuth from "../../../util/Auth";

// // const PrivateAuthRoute = ({ roles, children }) => {
// //   const [isChecked, setIsChecked] = useState(false);
// //   const [isLogged, setIsLogged] = useState(false);
// //   const [isAuthorized, setIsAuthorized] = useState(false);

// //   useEffect(() => {
// //     const fetchAuth = async () => {
// //       try {
// //         // Retrieve the logged-in user from local storage
// //         const response = await getAuth();
// //         console.log("Auth response:", response); // Debugging log

// //         if (response && response.employee_token) {
// //           setIsLogged(true); // User is logged in
// //           if (roles && roles.includes(response.employee_role)) {
// //             setIsAuthorized(true); // User has access to this route
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Error in PrivateAuthRoute:", error);
// //       } finally {
// //         setIsChecked(true); // Ensure we always set `isChecked` to true
// //       }
// //     };

// //     fetchAuth();
// //   }, [roles]);

// //   if (!isChecked) {
// //     // While authentication check is ongoing, return a placeholder (or spinner)
// //     return null; // Or <LoadingSpinner />
// //   }

// //   if (!isLogged) {
// //     // Navigate to login if user is not logged in
// //     return <Navigate to="/login" />;
// //   }

// //   if (!isAuthorized) {
// //     // Navigate to unauthorized page if user is not authorized
// //     return <Navigate to="/unauthorized" />;
// //   }

// //   // Render the children if all conditions are met
// //   return children;
// // };

// // // PropTypes validation for PrivateAuthRoute
// // PrivateAuthRoute.propTypes = {
// //   children: PropTypes.node.isRequired,
// //   roles: PropTypes.arrayOf(PropTypes.number).isRequired, // Roles should be an array of numbers
// // };

// // export default PrivateAuthRoute;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom"; // Import useLocation
import getAuth from '../../../util/Auth';

const PrivateAuthRoute = ({ roles, children }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const location = useLocation(); // Get the current location

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            const loggedInEmployee = await getAuth();
            if (isMounted) {
                if (loggedInEmployee.employee_token) {
                    setIsLogged(true);

                    if (roles && roles.length > 0) { // Check roles only if defined
                        if (loggedInEmployee.employee_role && roles.includes(loggedInEmployee.employee_role)) {
                            setIsAuthorized(true);
                        } else {
                            setIsAuthorized(false); // Explicitly set to false if role doesn't match
                        }
                    } else {
                        // No roles specified, but still check if the user has any role assigned
                        if (loggedInEmployee.employee_role) {
                            setIsAuthorized(true); // Allow access if logged in and has a role
                        } else {
                            setIsAuthorized(false); // User is logged in, but has no role assigned.
                        }
                    }
                }
                setIsChecked(true);
            }
        };

        checkAuth();

        return () => { isMounted = false; };
    }, [roles]);

    if (isChecked) {
        if (!isLogged) {
            return <Navigate to="/login" state={{ from: location }} replace />; // Redirect to login
        }
        if (!isAuthorized) {
            return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized
        }
    }

    return children;
};

PrivateAuthRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.array,
};

export default PrivateAuthRoute;