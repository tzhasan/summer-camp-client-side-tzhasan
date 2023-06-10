import React, { useState } from 'react';
import useTitle from '../../Hooks/useTitle';
import SliderSection from './SliderSection';
import PopulerClasses from './PopulerClasses';
import PopulerInstructors from './PopulerInstructors';

const Home = () => {
  useTitle("Home");
   


  return (
    <>
      
      <SliderSection></SliderSection>
      <PopulerClasses></PopulerClasses>
      <PopulerInstructors></PopulerInstructors>

      
    </>
    
  );
};

export default Home;