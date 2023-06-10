import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Shared Component/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin()
  if (loading || !isAdmin) {
    return <Loading></Loading>
  }
  if (isAdmin) {
    return children;
  }
  return <Navigate to={"/"}  replace></Navigate>;
};

export default AdminRoute;
