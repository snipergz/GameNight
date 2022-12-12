import React from 'react'
import Choice from '../components/Mystery/MysteryGameChoice'
import Room from "../assets/MurderMystery/game3.png";
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const MysteryGame = () => {
    return (
    <>
    <Navbar/>
    <div>
        <section className='container mx-auto p-4 h-auto max-w-full md:mt-20'>
          <div className='text-white mx-auto max-w-[1040px] relative'>
              <h1 className=' text-center text-3xl lg:text-3xl mb-4'>Murder Mystery is currently under construction</h1>
              <img className='w-[50%] md:w-[35%] mx-auto border border-black rounded-xl' src={Room} alt="" />
              {/* <Link className='block bg-mysteryYellow mt-6 lg:mt-12 text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded' to='/MysteryPlay'>Play Mystery Party</Link>         */}
          </div>
        </section>
    </div>
    </>

    );
  
    
  }

export default MysteryGame;

/*
{
    return (
        <whole>
        <Navbar/>
        <div>
            <img src={Room} alt="Room Image"/>
            <Link className='hold' to='/MysteryPlay'>Play Mystery Party</Link>
        </div>
        <Choice/>
        </whole>
    );
}
*/