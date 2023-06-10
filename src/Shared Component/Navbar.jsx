import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { MoodContext } from "../Provider/Dark mood provider/MoodProvider";
import logo from '../../src/assets/logo.png'
import { ImUserCheck } from "react-icons/im";
import useAdmin from "../Hooks/useAdmin";
import useInstractor from "../Hooks/useInstractor";
import useStudent from "../Hooks/useStudent";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    toggleTheme,
    theme,
  } = useContext(MoodContext)

  const [isAdmin] = useAdmin()
  const [isInstructor] = useInstractor()
  const [isStudent] = useStudent()
 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const signingOut = () => {
    logOut();
  };
  return (
    <div className="navbar bg-slate-200 bg-opacity-80 md:sticky md:top-0 md:z-50">
      <div className="navbar-start md:mx-10 mx-2">
        <div className="dropdown">
          <label
            onClick={toggleMenu}
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-compact dropdown-content mt-3 p-2 shadow text-gray-600 rounded-box w-52 bg-gray-400 ${
              isMenuOpen ? "" : "hidden"
            }`}
          >
            <li className="hover:text-sky-600">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-600 hover:bg-transparent"
                    : "active:bg-transparent hover:bg-transparent"
                }
                to={"/"}
              >
                Home
              </NavLink>
            </li>

            <li className="hover:text-sky-600">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-600 hover:bg-transparent"
                    : "active:bg-transparent hover:bg-transparent"
                }
                to={"/instructors"}
              >
                Instructors
              </NavLink>
            </li>
            <li className="hover:text-sky-600">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-600 hover:bg-transparent"
                    : "active:bg-transparent hover:bg-transparent"
                }
                to={"/classesPage"}
              >
                Classes
              </NavLink>
            </li>
            <li className="hover:text-sky-600">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-600 hover:bg-transparent"
                    : "active:bg-transparent hover:bg-transparent"
                }
                to={
                  isAdmin
                    ? "/dashboard/manageclasses"
                    : isInstructor
                    ? "/dashboard/myclasses"
                    : "/dashboard/myselectedclasses"
                }
                exact
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="flex items-center ">
          <img className="w-[8%] ml-2" src={logo} alt="" />
          <Link
            to={"/"}
            className="btn btn-ghost normal-case text-md md:text-2xl text-gray-600 hover:bg-transparent  hover:text-sky-600"
          >
            Phonetics
          </Link>
          <div className=" flex items-center md:mt-1">
            <span className="label-text text-gray-600">{theme}</span>
            <label className="label cursor-pointer">
              <input
                onClick={() => toggleTheme()}
                type="checkbox"
                className="toggle "
              />
            </label>
          </div>
        </div>
      </div>
      {/* Large screen manu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-600  text-lg  ">
          <li className="hover:text-sky-600">
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-600 hover:bg-transparent"
                  : "active:bg-transparent hover:bg-transparent"
              }
              to={"/"}
            >
              Home
            </NavLink>
          </li>

          <li className="hover:text-sky-600">
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-600 hover:bg-transparent"
                  : "active:bg-transparent hover:bg-transparent"
              }
              to={"/instructors"}
            >
              Instructors
            </NavLink>
          </li>
          <li className="hover:text-sky-600">
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-600 hover:bg-transparent"
                  : "active:bg-transparent hover:bg-transparent"
              }
              to={"/classesPage"}
            >
              Classes
            </NavLink>
          </li>

          {user && (
            <li className="hover:text-sky-600">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-600 hover:bg-transparent"
                    : "active:bg-transparent hover:bg-transparent"
                }
                to={
                  isAdmin
                    ? "/dashboard/manageusers"
                    : isInstructor
                    ? "/dashboard/myclasses"
                    : "/dashboard/myselectedclasses"
                }
                exact
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      {/* Large screen manu */}

      {/* Profile photo and login logout */}
      <div className="navbar-end ">
        {user && (
          <div
            data-tip={user?.displayName}
            className="avatar tooltip tooltip-bottom tooltip-accent"
          >
            <div className="w-8 rounded  mr-2 ">
              {user?.photoURL ? (
                <img
                  className="w-[50%] "
                  // title={user.displayName}
                  src={user?.photoURL}
                  alt={user?.email}
                />
              ) : (
                <div
                  title={user.displayName}
                  className="md:text-6xl text-3xl text-gray-300 "
                >
                  <ImUserCheck></ImUserCheck>
                </div>
              )}
            </div>
          </div>
        )}
        {user ? (
          <p onClick={signingOut} className="projectMainButton cursor-pointer">
            Log out
          </p>
        ) : (
          <Link to="/login" className="projectMainButton cursor-pointer">
            Log in
          </Link>
        )}
      </div>
      {/* Profile photo and login logout */}
    </div>
  );
};

export default Navbar;
