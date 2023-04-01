import React from 'react'
import Footer from '../Footer/Footer';
import Features from './Features/Features';
import Hero from './Hero/Hero';

const Home = () => {
  return (
    <>
    <div className="mt-14">
      <Hero/>
      <Features/>
    </div>
    </>
  )
}

export default Home;