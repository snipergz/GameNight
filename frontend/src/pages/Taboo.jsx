import React from 'react'
import Navbar from '../components/Navbar'
import HeroTaboo from '../components/Taboo/HeroTaboo'
import AboutTaboo from '../components/Taboo/AboutTaboo'
import RulesTaboo from '../components/Taboo/RulesTaboo'

const Taboo = () => {
    
  return (
    <>
        <Navbar/>
        <HeroTaboo />
        <AboutTaboo />
        <RulesTaboo />
    </>
  )
}

export default Taboo