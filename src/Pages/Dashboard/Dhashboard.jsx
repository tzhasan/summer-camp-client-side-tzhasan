import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { AuthContext } from "../../Provider/AuthProvider";
import useInstractor from "../../Hooks/useInstractor";
import useStudent from "../../Hooks/useStudent";
import Loading from "../../Shared Component/Loading";
import Navbar from "../../Shared Component/Navbar";
import manageUsericon from '../../../src/assets/icons/reshot-icon-users-FTWYDJLB5X.svg'
import classicon from '../../../src/assets/icons/reshot-icon-class-YKDPZM8GN5.svg'
import myclasses from '../../../src/assets/icons/myclasses.svg'
import addaclass from '../../../src/assets/icons/addaclass.svg'
import cart from '../../../src/assets/icons/cart.svg'
import history from '../../../src/assets/icons/history.svg'
import selected from '../../../src/assets/icons/selected.svg'
import Footer from "../../Shared Component/Footer";

const Dhashboard = () => {

  const { user ,loading } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const navigate = useNavigate()
  const [isInstructor] = useInstractor();
  const [isStudent] = useStudent();
  if (!user) {
    return navigate('/')
  }
  if (loading || !user) {
    return <Loading></Loading>
  }
  return (
    <>
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
          <ul className="menu p-4 w-80 h-full text-base-content">
            <h1 className="md:text-4xl text-xl p-6 w-80  text-base-content">
              {isAdmin
                ? "Admin Dashboard"
                : isInstructor
                ? "Instructor Dashboard"
                : isStudent
                ? "Student Dashboard"
                : "Dashboard Loading"}
            </h1>
            {/* Sidebar content here */}
            {isAdmin && user?.email && (
              <>
                <li className="text1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-600 hover:bg-transparent"
                        : "text-gray-400"
                    }
                    to={"/dashboard/manageusers"}
                  >
                    <img className="w-6" src={manageUsericon} /> Manage Users
                  </NavLink>
                </li>
                <li className="text1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-600 hover:bg-transparent"
                        : "text-gray-400"
                    }
                    to={"/dashboard/manageclasses"}
                  >
                    <img className="w-6" src={classicon} /> Manage Classes
                  </NavLink>
                </li>
              </>
            )}
            {isInstructor && user?.email && (
              <>
                <li className="text1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-600 hover:bg-transparent"
                        : "text-gray-400"
                    }
                    to={"/dashboard/myclasses"}
                  >
                    <img className="w-6" src={myclasses} /> My Classes
                  </NavLink>
                </li>
                <li className="text1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-600 hover:bg-transparent"
                        : "text-gray-400"
                    }
                    to={"/dashboard/addaclass"}
                  >
                    <img className="w-6" src={addaclass} /> Add a Class
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && !isInstructor && isStudent && (
              <>
                <li className="text1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-600 hover:bg-transparent"
                        : "text-gray-400"
                    }
                    to={"/dashboard/myselectedclasses"}
                  >
                    <img className="w-6" src={cart} /> My Selected Classes
                  </NavLink>
                </li>
                <li className="text1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-600 hover:bg-transparent"
                        : "text-gray-400"
                    }
                    to={"/dashboard/enrolledclasses"}
                  >
                    <img className="w-6" src={selected} /> My Enrolled Classes
                  </NavLink>
                </li>
                <li className="text1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-600 hover:bg-transparent"
                        : "text-gray-400"
                    }
                    to={"/dashboard/paymentHistory"}
                  >
                    <img className="w-6" src={history} /> Payment History
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>
            <li className="text-lg md:text-xl text-gray-600  ">
              <Link to={"/"}>Classes</Link>
            </li>
            <li className="text-lg md:text-xl text-gray-600  ">
              <Link to={"/classesPage"}>Instractors</Link>
            </li>
            <li className="text-lg md:text-xl text-gray-600  ">
              <Link to={"/"}>Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dhashboard;
