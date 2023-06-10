import React from 'react';
import anime from "animejs";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/36395-lonely-404.json";
import { Link } from 'react-router-dom';

const Error404page = () => {
       
  return (
    <div className="w-[50vw] h-[50%] mx-auto">
      <div>
        <Lottie animationData={groovyWalkAnimation} loop={true} />
      </div>
      <div className='flex items-center justify-center'>
        <Link to={'/'}>
          {" "}
          <button className="projectMainButton">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Error404page;