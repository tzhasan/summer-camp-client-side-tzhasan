import React from 'react';
import groovyWalkAnimation from "../../src/assets/nodata.json";
import Lottie from "lottie-react";


const NodataFound = () => {
  return (
      <div className="w-[50vw] h-[50%] mx-auto ">
        <Lottie animationData={groovyWalkAnimation} loop={true} />
      </div>
  );
};

export default NodataFound;