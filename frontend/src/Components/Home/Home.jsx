import React from 'react';
import Features from './Features/Features';
import Hero from './Hero/Hero';
import HowItHelps from './HowItHelps/HowItHelps';
import ContactUs from './ContactUs/ContactUs';

const Home = () => {
  return (
    <>
      <div>
        <Hero />
        <HowItHelps />
        <Features />
        <ContactUs />
      </div>
    </>
  );
};

export default Home;
