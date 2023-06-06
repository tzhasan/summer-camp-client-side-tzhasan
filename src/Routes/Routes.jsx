import { createBrowserRouter } from "react-router-dom";
import HomeLayoutes from "../Layoutes/HomeLayoutes";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayoutes></HomeLayoutes>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  }
])

export default router