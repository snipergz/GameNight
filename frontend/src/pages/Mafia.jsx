import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Mafia/Hero'
import About from '../components/Mafia/About'
import Characters from '../components/Mafia/Characters'
import Rules from '../components/Mafia/Rules'

const Mafia = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <About/>
        <Characters/>
        <Rules/>
    </>
  )
}

export default Mafia