import React, { useState } from 'react';
import useTitle from '../../Hooks/useTitle';
import SliderSection from './SliderSection';
import PopulerClasses from './PopulerClasses';

const Home = () => {
  useTitle("Home");
   


  return (
    <>
      
      <SliderSection></SliderSection>
      <PopulerClasses></PopulerClasses>

      
    </>
    
  );
};

export default Home;