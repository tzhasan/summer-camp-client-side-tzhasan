import { createBrowserRouter } from "react-router-dom";
import HomeLayoutes from "../Layoutes/HomeLayoutes";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dhashboard from "../Pages/Dashboard/Dhashboard";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayoutes></HomeLayoutes>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dhashboard></Dhashboard>,
    children: [
      {
        path: "/dashboard/manageclasses",
        element: <ManageClasses></ManageClasses>,
      },

      {
        path: "/dashboard/manageusers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/addaclass",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/myclasses",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/myselectedclasses",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/enrolledclasses",
        element: <ManageUsers></ManageUsers>,
      },
    ],
  },
]);

export default router