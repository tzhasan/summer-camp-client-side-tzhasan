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
import Instructor from "../Pages/Instructor/Instructor";
import Payment from "../Pages/Payments/Payment";
import InstructorRoute from "./InstructorRoute";
import StudentRoute from "./StudentRoute";
import Error404page from "../Pages/errorpage/Error404page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayoutes></HomeLayoutes>,
    errorElement: <Error404page></Error404page>,
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
      {
        path: "/instructors",
        element: <Instructor />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dhashboard></Dhashboard>,
    children: [
      {
        path: "/dashboard/manageclasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/manageusers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addaclass",
        element: (
          <InstructorRoute>
            <AddaClass></AddaClass>
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/myclasses",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/myselectedclasses",
        element: (
          <StudentRoute>
            <MySelectedClasses></MySelectedClasses>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/enrolledclasses",
        element: (
          <StudentRoute>
            <EnrolledClasses></EnrolledClasses>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment />,
      },
    ],
  },
]);

export default router;
