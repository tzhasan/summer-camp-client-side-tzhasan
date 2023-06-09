import React, { useState } from 'react';
import useTitle from '../../Hooks/useTitle';
import SliderSection from './SliderSection';

const Home = () => {
  useTitle("Home");
   


  return (
    <>
      
        <SliderSection></SliderSection>

      
    </>
    
  );
};

export default Home;