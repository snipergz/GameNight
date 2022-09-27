import React from 'react'
import Hero from '../components/Home/Hero';
import Navbar from '../components/Navbar';
import About from '../components/Home/About';

const Home = () => {
  return(
    <>
      <Navbar/>
      <Hero/>
      <About/>
    </>
  );
}

export default Home