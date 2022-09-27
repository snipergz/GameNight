import React from 'react'
import gameNight from '../assets/game-night-logo-700x467-2847594515.png'
import gameCouch from '../assets/gameCouch.png'

const Hero = () => {
  return (
    <div className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-2'>
              <h1 className="text-5xl">
                <span className="text-pink leading-3 outline-none drop-shadow-titleLeft">
                  Game
                </span>
                <span className="text-blue leading 3 outline-none drop-shadow-titleRight">
                  Night
                </span>
              </h1>
              <h2 className="text-white text-3xl my-4">
                Are you ready to have some fun?
              </h2>
              <button className='py-3 px-6 sm:w-[60%]'>Get Started</button>
            </div>
            <div className=''>
              <img className='w-[75%] mx-auto border rounded-xl' src={gameCouch} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Hero