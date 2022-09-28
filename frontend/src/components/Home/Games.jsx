import React from 'react'
import { Link } from 'react-router-dom';
import mafiaCard1 from '../../assets/Mafia/mafia-card-1.jpg'

const Games = () => {
  return (
    <section id='games' className='container mx-auto p-4 h-[500px] my-auto md:mt-20'>
        <h1 className='text-4xl p-2 text-white'>Featured Games:</h1>
        <div className='grid md:grid-cols-3 max-w-[1240px] m-auto text-dark gap-8 sm:gap-2'>
            <div className='flex flex-col bg-white rounded-lg shadow-lg bg-white max-w-sm'>
                <img src={mafiaCard1} alt=''/>
                <div className='p-4'>
                    <h3 className='text-2xl'>Mafia</h3>
                    <p className='mb-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatibus nemo iste quia delectus tenetur expedita atque deleniti placeat animi nulla sint veniam quisquam magnam.</p>
                    <Link className='block bg-darkPurple text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded' to='/mafia'>Play Mafia</Link>
                </div>
            </div>
            <div className='flex flex-col bg-white rounded-lg shadow-lg bg-white max-w-sm'>
                <img src={mafiaCard1} alt=''/>
                <div className='p-4'>
                    <h3 className='text-2xl'>Taboo</h3>
                    <p className='mb-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatibus nemo iste quia delectus tenetur expedita atque deleniti placeat animi nulla sint veniam quisquam magnam.</p>
                    <Link className='block bg-darkPurple text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded' to='/taboo'>Play Taboo</Link>
                </div>
            </div>
            <div className='flex flex-col bg-white rounded-lg shadow-lg bg-white max-w-sm'>
                <img src={mafiaCard1} alt=''/>
                <div className='p-4'>
                    <h3 className='text-2xl'>Mafia</h3>
                    <p className='mb-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatibus nemo iste quia delectus tenetur expedita atque deleniti placeat animi nulla sint veniam quisquam magnam.</p>
                    <Link className='block bg-darkPurple text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded' to='/mafia'>Play Game</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Games