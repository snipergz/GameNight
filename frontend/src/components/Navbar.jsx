import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

  return (
    <div className='w-screen h-[80px] z-10 bg-zince-200 fixed drop-shadow-lg'>
        <div className='px-2 flex justify-between items-center w-full h-full'>
            <div className='flex items-center'>
            <Link className='text-3xl font-bold mr-4 sm:text-4xl' to='/'>GameNight</Link>
                <ul className='hidden md:flex'>
                    <Link to='/mafia'>Mafia</Link>
                    <Link to='/taboo'>Taboo</Link>
                </ul>  
            </div>
            <div className='hidden md:flex pr-4'>
                <button className='border-none bg-transparent text-black mr-4'>Sign In</button>
                <button className='px-8 py-3'>Sign Up</button>
            </div>
            <div className='md:hidden mr-4' onClick={handleClick}>
                {!nav ? <>OPEN</>: <>CLOSE</>}
            </div>
        </div>

        <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
            <Link className='border-b-2 border-zinc-300 w-full' to='/mafia'>Mafia</Link>
            <Link className='border-b-2 border-zinc-300 w-full' to='/taboo'>Taboo</Link>
            <div className='flex flex-col my-4'>
            <button className='border-none bg-transparent text-indigo-600 px-8 py-3 mb-4'>Sign In</button>
            <button className='px-8 py-3'>Sign Up</button>
        </div>
        </ul>
    </div>
  )
}

export default Navbar