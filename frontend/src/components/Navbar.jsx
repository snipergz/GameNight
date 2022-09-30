import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {HiChevronDoubleUp, HiOutlineViewList } from 'react-icons/hi'

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

  return (
    <div className='w-screen text-white h-[50px] bg-navy z-10 fixed drop-shadow-lg'>
        <div className='px-2 flex justify-between items-center w-full h-full'>
            <div className='flex items-center'>
            <Link className='font-bold mr-4 hidden sm:block' to='/'>
                <span className='text-neonPink text-xl'>Game</span>
                <span className='text-neonBlue text-xl'>Night</span>
            </Link>
            </div>
            <div className='hidden md:flex pr-4 items-center gap-4'>
                <Link to='/home' className='hover:text-neonBlue'>Home</Link>
                <Link to='/mafia' className='hover:text-neonPink'>Mafia</Link>
                <Link to='/taboo' className='hover:text-neonBlue'>Taboo</Link>
                <button className='hover:text-neonPink'>Sign In</button>
                <button className='hover:text-neonBlue'>Sign Up</button>
            </div>
            <div className='md:hidden mr-4 justify-start' onClick={handleClick}>
                {!nav ? <HiOutlineViewList/>: <HiChevronDoubleUp/>}
            </div>
        </div>

        <ul className={!nav ? 'hidden' : 'absolute bg-navy w-full px-8'}>
            <Link className='border-b-2 border-zinc-300 w-full block' to='/mafia'>Mafia</Link>
            <Link className='border-b-2 border-zinc-300 w-full blc' to='/taboo'>Taboo</Link>
            <div className='flex flex-col my-4'>
            <button className='border-none bg-transparent text-indigo-600 px-8 py-3 mb-4'>Sign In</button>
            <button className='px-8 py-3'>Sign Up</button>
        </div>
        </ul>
    </div>
  )
}

export default Navbar