import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dhashboard = () => {
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
        <ul className="menu p-4 w-80 h-full text-base-content">
          {/* Sidebar content here */}
          <li className="text1">
            <Link to={"/dashboard/manageclasses"}>Manage Classes</Link>
          </li>
          <li className="text1">
            <Link to={"/dashboard/manageusers"}>Manage Users</Link>
          </li>
          <li className="text1 my-4 ">
            <Link to={"/"}>Back to Home Page</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dhashboard;