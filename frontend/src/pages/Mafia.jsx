import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Mafia/Hero'
import About from '../components/Mafia/About'
import Characters from '../components/Mafia/Characters'

const Mafia = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <About/>
        <Characters/>
    </>
  )
}

export default Mafia