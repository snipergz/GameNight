import React from 'react'
import Navbar from '../components/Navbar'
import MafiaServerComponent from '../components/Mafia/MafiaServerComponent'

const Server = ({gameName}) => {
  return (
    <>
        <Navbar/>
        <MafiaServerComponent gameName={gameName}/>
    </>
  )
}

export default Server