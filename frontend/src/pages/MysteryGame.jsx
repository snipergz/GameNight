import React from 'react'
import Choice from '../components/Mystery/MysteryGameChoice'
import Room from "../assets/Mystery/r.png";
import Navbar from '../components/Navbar';

const Mystery = () => {
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

export default Mystery