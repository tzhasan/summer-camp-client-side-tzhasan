import React from 'react';
import Navbar from '../Shared Component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared Component/Footer';

const HomeLayoutes = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      
    </div>
  );
};

export default HomeLayoutes;