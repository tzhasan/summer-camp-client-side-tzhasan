import React, { useState } from 'react';
import useTitle from '../../Hooks/useTitle';
import SliderSection from './SliderSection';
import PopulerClasses from './PopulerClasses';
import PopulerInstructors from './PopulerInstructors';
import ExtraSection1 from './ExtraSection1';
import Welcome from '../../Shared Component/Welcome';

const Home = () => {
  useTitle("Home");
   


  return (
    <>
      <Welcome></Welcome>
      <SliderSection></SliderSection>
      <PopulerClasses></PopulerClasses>
      <PopulerInstructors></PopulerInstructors>
      <ExtraSection1></ExtraSection1>

      
    </>
    
  );
};

export default Home;