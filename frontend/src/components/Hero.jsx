import React from 'react'
import gameNight from '../assets/game-night-logo.png'
import gameCouch from '../assets/gameCouch.png'

const Hero = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none'>
              <h1 className='text-5xl lg:text-6xl font-navFontRS'>
                <span className="text-neonPink leading-3 outline-none drop-shadow-titleLeft">
                  Game
                </span>
                <span className="text-neonBlue my-4 leading 3 outline-none drop-shadow-titleRight">
                  Night
                </span>
              </h1>
              <h2 className="text-white text-xl lg:text-3xl my-4">
                Are you ready to have some fun?
              </h2>
              <div className='flex flex-row gap-5 w-full justify-center xl:justify-start'>
                <a className='bg-darkPurple text-white py-3 px-6 min-w-[145px] border border-navy rounded' href="#" >Let's Play</a>
                <a className='bg-white text-darkPurple py-3 px-6 min-w-[145px] border border-darkPurple rounded' href="#">Learn More</a>
              </div>

            </div>
            <div className=''>
              <img className='w-[75%] mx-auto border border-x-neonPink border-y-neonBlue rounded-xl' src={gameCouch} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Hero