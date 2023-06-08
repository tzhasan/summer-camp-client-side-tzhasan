import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin()
  console.log(isAdmin);
  if (loading) {
    return <progress className="progress w-full"></progress>;
  }
  if (isAdmin) {
    return children;
  }
  return <Navigate to={"/"}  replace></Navigate>;
};

export default AdminRoute;
