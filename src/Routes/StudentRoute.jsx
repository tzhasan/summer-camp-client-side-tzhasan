import React, { useContext } from 'react';
import useStudent from '../Hooks/useStudent';
import Loading from '../Shared Component/Loading';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const StudentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isStudent] = useStudent();
  if (loading || !isStudent) {
    return <Loading></Loading>;
  }
  if (isStudent) {
    return children;
  }
  return <Navigate to={"/"} replace></Navigate>;
};

export default StudentRoute;