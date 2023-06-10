  import React, { useContext } from 'react';
  import { Navigate, useLocation } from 'react-router-dom';
  import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Shared Component/Loading';

const PrivetRoutes = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading && !user) {
    return <Loading></Loading>
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivetRoutes;