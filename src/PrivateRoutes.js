// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       element={props =>
//         isAuthenticated ? <Element {...props} /> : <Navigate to="/login" replace />
//       }
//     />
//   );
// };

// export default PrivateRoute;

// import React from 'react';
// import { Route, Routes, Navigate,useNavigate} from 'react-router-dom';

// const PrivateRoute = ({ path, element: Element, isAuthenticated }) => {
//   const navigate = useNavigate();

//   if (!isAuthenticated) {
//     // Redirect to the login page if not authenticated
//     // return <Navigate to="/login" replace />;
//     navigate('/login');
//   }

//   return <Route path={path} element={<Element />} />;
// };

// export default PrivateRoute;


// PrivateRoute.js
// import React from 'react';
// import { Route, Navigate, Routes } from 'react-router-dom';

// const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
//   return isAuthenticated ? (
//     <Routes>
//             <Route {...rest} element={<Element />} />
//     </Routes>

//   ) : (
//     <Navigate to="/login" replace state={{ from: rest.location }} />
//   );
// };

// export default PrivateRoute;

