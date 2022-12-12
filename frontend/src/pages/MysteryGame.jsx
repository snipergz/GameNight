<<<<<<< HEAD
import React from "react";

function MysteryGame() {
  return <div>MysteryGame</div>;
}

export default MysteryGame;
=======
import React from 'react'
import Choice from '../components/Mystery/MysteryGameChoice'
import Room from "../assets/Mystery/r.png";
import Navbar from '../components/Navbar';

const MysteryGame = () => {
    return (
        <>
        <Navbar />
        <div>
            <img src={Room} alt="Room Image"/>
        </div>
        <Choice/>
        </>
    )
}

export default MysteryGame;
>>>>>>> a58ddf3a0c0367d0dd7a354ab7dd9178dd880c00
