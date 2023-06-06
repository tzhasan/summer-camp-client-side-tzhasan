import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // const signingOut = () => {
  //   logOut();
  // };
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
            <li className="hover:text-sky-500">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-500 hover:bg-transparent"
                    : "active:bg-transparent hover:bg-transparent"
                }
                to={"/"}
              >
                Home
              </NavLink>
            </li>

            <li className="hover:text-sky-500">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-500 hover:bg-transparent"
                    : "active:bg-transparent hover:bg-transparent"
                }
                to={"/instructors"}
              >
                Instructors
              </NavLink>
            </li>
            <li className="hover:text-sky-500">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-500 hover:bg-transparent"
                    : "active:bg-transparent hover:bg-transparent"
                }
                to={"/classes"}
              >
                Classes
              </NavLink>
            </li>
            <li className="hover:text-sky-500">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-500 hover:bg-transparent"
                    : "active:bg-transparent hover:bg-transparent"
                }
                to={"/dashboard"}
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
        {/*  */}
        {/* Logo */}
        <img className="w-[8%] ml-2" src="" alt="" />
        <Link
          to={"/"}
          className="btn btn-ghost normal-case text-md md:text-2xl text-gray-600 hover:bg-transparent  hover:text-sky-500"
        >
          Phonetics
        </Link>
      </div>
      {/* Large screen manu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-600  text-lg  ">
          <li className="hover:text-sky-500">
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-500 hover:bg-transparent"
                  : "active:bg-transparent hover:bg-transparent"
              }
              to={"/"}
            >
              Home
            </NavLink>
          </li>

          <li className="hover:text-sky-500">
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-500 hover:bg-transparent"
                  : "active:bg-transparent hover:bg-transparent"
              }
              to={"/instructors"}
            >
              Instructors
            </NavLink>
          </li>
          <li className="hover:text-sky-500">
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-500 hover:bg-transparent"
                  : "active:bg-transparent hover:bg-transparent"
              }
              to={"/classes"}
            >
              Classes
            </NavLink>
          </li>

          <li className="hover:text-sky-500">
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-500 hover:bg-transparent"
                  : "active:bg-transparent hover:bg-transparent"
              }
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Large screen manu */}

      {/* Profile photo and login logout */}
      <div className="navbar-end ">
        {/* {user && (
          <div
            data-tip={user.displayName}
            className="avatar tooltip tooltip-bottom tooltip-accent"
          >
            <div className="w-8 rounded  mr-2 ">
              {user.photoURL ? (
                <img
                  className="w-[50%] "
                  // title={user.displayName}
                  src={user.photoURL}
                  alt={user.email}
                />
              ) : (
                <div
                  title={user.displayName}
                  className="md:text-6xl text-3xl text-gray-300 "
                >
                  <CgProfile title={user.displayName}></CgProfile>
                </div>
              )}
            </div>
          </div>
        )} */}
        {/* {user ? (
          <p
            onClick={signingOut}
            className="btn rounded-lg px-2  md:px-4  bg-yellow-300 hover:bg-yellow-500 border-0 text-gray-600 text-xs md:text-lg"
          >
            Log out
          </p>
        ) : (
          <Link
            to="/login"
            className="btn rounded-lg text-xs md:text-lg px-2 bg-yellow-300 hover:bg-yellow-500 border-0 text-gray-600 "
          >
            Log in
          </Link>
        )} */}
      </div>
      {/* Profile photo and login logout */}
    </div>
  );
};

export default Navbar;
