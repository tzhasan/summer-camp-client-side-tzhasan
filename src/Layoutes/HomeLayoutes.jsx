import React from 'react';
import Navbar from '../Shared Component/Navbar';
import { Outlet } from 'react-router-dom';

const HomeLayoutes = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
      
    </div>
  );
};

export default HomeLayoutes;