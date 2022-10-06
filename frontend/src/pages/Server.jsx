import React from 'react'
import Navbar from '../components/Navbar'
import ServerComponent from '../components/ServerComponent'

const Server = ({gameName}) => {
  return (
    <>
        <Navbar/>
        <ServerComponent gameName={gameName}/>
    </>
  )
}

export default Server