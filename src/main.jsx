import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes.jsx';
import AuthProvider from './Provider/AuthProvider';
import MoodProvider from './Provider/Dark mood provider/MoodProvider';

ReactDOM.createRoot(document.getElementById("root")).render(
  <MoodProvider>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </MoodProvider>
);
