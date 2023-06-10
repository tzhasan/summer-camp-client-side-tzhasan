import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useInstractor from '../Hooks/useInstractor';
import Loading from '../Shared Component/Loading';
import { Navigate } from 'react-router-dom';

const InstructorRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor] = useInstractor()
  if (loading || !isInstructor) {
    return <Loading></Loading>
  }
  if (isInstructor) {
    return children;
  }
  return <Navigate to={"/"}  replace></Navigate>;
};


export default InstructorRoute;