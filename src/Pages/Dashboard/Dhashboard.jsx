import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { AuthContext } from "../../Provider/AuthProvider";
import useInstractor from "../../Hooks/useInstractor";
import useStudent from "../../Hooks/useStudent";
import Loading from "../../Shared Component/Loading";

const Dhashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstractor();
  const [isStudent] = useStudent();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="projectMainButton drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <div className="w-full py-4 px-10">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <h1 className="md:text-4xl text-xl p-6 w-80  text-base-content">
          {isAdmin
            ? "Admin Dashboard"
            : isInstructor
              ? "Instructor Dashboard"
              : isStudent?
             "Student Dashboard" : "Dashboard Loading"}
        </h1>
        <ul className="menu p-4 w-80 h-full text-base-content">
          {/* Sidebar content here */}
          {!isStudent && !isAdmin && !isInstructor && (
            <li>
              {" "}
              <Loading></Loading>
            </li>
          )}
          {isAdmin && user?.email && (
            <>
              <li className="text1">
                <Link to={"/dashboard/manageusers"}>Manage Users</Link>
              </li>
              <li className="text1">
                <Link to={"/dashboard/manageclasses"}>Manage Classes</Link>
              </li>
            </>
          )}
          {isInstructor && user?.email && (
            <>
              <li className="text1">
                <Link to={"/dashboard/myclasses"}>My Classes</Link>
              </li>
              <li className="text1">
                <Link to={"/dashboard/addaclass"}>Add a Class</Link>
              </li>
            </>
          )}
          {!isAdmin && !isInstructor && isStudent && (
            <>
              <li className="text1">
                <Link to={"/dashboard/myselectedclasses"}>
                  My Selected Classes
                </Link>
              </li>
              <li className="text1">
                <Link to={"/dashboard/enrolledclasses"}>
                  My Enrolled Classes
                </Link>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li className="text1 my-4 ">
            <Link to={"/"}>Back to Home Page</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dhashboard;
