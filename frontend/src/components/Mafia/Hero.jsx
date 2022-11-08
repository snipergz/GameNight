import React from 'react'
import mafiaHouse from '../../assets/Mafia/mafia-house.jpg'

const Hero = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none'>
              <h1 className='text-5xl lg:text-6xl font-navFontRS text-mafiaRed leading-3 outline-none drop-shadow-mafia'>Mafia</h1>             
              <h2 className="text-white text-xl lg:text-3xl my-4">
                A Game of Mystery and Excitement
              </h2>
              <div className='flex flex-row gap-5 w-full justify-center xl:justify-start'>
                <a className='bg-mafiaRed text-white py-3 px-6 min-w-[145px] border border-navy rounded' href="#mafia-characters" >Let's Play 👇</a>
                <a className='bg-white text-mafiaRed py-3 px-6 min-w-[145px] border border-mafiaRed rounded' href="#mafia-about">Learn More</a>
              </div>

            </div>
            <div className=''>
              <img className='w-[90%] md:w-[75%] mx-auto border border-black rounded-xl' src={mafiaHouse} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Hero