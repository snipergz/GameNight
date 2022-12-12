import React from 'react'
import Choice from '../components/Mystery/MysteryGameChoice'
import Room from "../assets/MurderMystery/game3.png";
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