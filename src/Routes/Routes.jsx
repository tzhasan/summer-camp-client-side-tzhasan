import { createBrowserRouter } from "react-router-dom";
import HomeLayoutes from "../Layoutes/HomeLayoutes";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dhashboard from "../Pages/Dashboard/Dhashboard";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import AddaClass from "../Pages/Dashboard/AddAClass/AddaClass";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import MySelectedClasses from "../Pages/Dashboard/MySelectedClasses/MySelectedClasses";
import EnrolledClasses from "../Pages/Dashboard/EnrolledClasses/EnrolledClasses";
import ClassesPage from "../Pages/Classes/ClassesPage";

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
      {
        path: "/classesPage",
        element: <ClassesPage></ClassesPage>,
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
        element: <AddaClass></AddaClass>,
      },
      {
        path: "/dashboard/myclasses",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "/dashboard/myselectedclasses",
        element: <MySelectedClasses></MySelectedClasses>,
      },
      {
        path: "/dashboard/enrolledclasses",
        element: <EnrolledClasses></EnrolledClasses>,
      },
    ],
  },
]);

export default router;
