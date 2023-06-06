import { createBrowserRouter } from "react-router-dom";
import HomeLayoutes from "../Layoutes/HomeLayoutes";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayoutes></HomeLayoutes>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
    ]
  }
])

export default router