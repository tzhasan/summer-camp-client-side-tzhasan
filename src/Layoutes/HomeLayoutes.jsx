import React from 'react';
import Navbar from '../Shared Component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared Component/Footer';
import Error404page from '../Pages/errorpage/Error404page';

const HomeLayoutes = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <Error404page></Error404page>
      
    </div>
  );
};

export default HomeLayoutes;