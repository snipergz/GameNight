import React from 'react'
import Hero from '../components/Home/Hero';
import Navbar from '../components/Navbar';
import About from '../components/Home/About';
import Games from '../components/Home/Games';

const Home = () => {
  return(
    <>
      <Navbar/>
      <Hero/>
      <About/>
      <Games/>
    </>
  );
}

export default Home