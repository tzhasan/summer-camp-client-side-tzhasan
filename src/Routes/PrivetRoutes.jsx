  import React, { useContext } from 'react';
  import { Navigate, useLocation } from 'react-router-dom';
  import { AuthContext } from '../Provider/AuthProvider';

const PrivetRoutes = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <progress className="progress w-full"></progress>;
  }
  if (user?.email) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivetRoutes;