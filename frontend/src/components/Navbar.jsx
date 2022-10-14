import React, { useState } from "react";
import { HiChevronDoubleUp, HiOutlineViewList } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <>
      <ul
        className={
          !nav
            ? "invisible md:visible text-white p-2 flex flex-row justify-between"
            : "text-white flex flex-col md:gap-1 p-2 "
        }
      >
        <div className="invisible md:visible flex items-center ">
          <Link className="font-bold mr-4 hidden sm:block" to="/">
            <span className="text-neonPink text-xl">Game</span>
            <span className="text-neonBlue text-xl">Night</span>
          </Link>
        </div>
        <div className="md:pr-4 flex flex-col md:inline-block top-0 fixed md:relative bg-navy w-full md:w-auto md:bg-transparent">
          <div
            className="visible md:hidden mr-4 p-2 pb-0 pl-0 justify-start text-white"
            onClick={handleClick}
          >
            {!nav ? <HiOutlineViewList /> : <HiChevronDoubleUp />}
          </div>
          <Link to="/home" className="hover:text-neonBlue md:pr-3">
            Home
          </Link>
          <Link to="/mafia" className="hover:text-neonPink md:pr-3">
            Mafia
          </Link>
          <Link to="/taboo" className="hover:text-neonBlue md:pr-3">
            Taboo
          </Link>
          <button className="hover:text-neonPink text-left md:pr-3">
            Sign In
          </button>
          <button className="hover:text-neonBlue text-left md:pr-3">
            Sign Up
          </button>
        </div>
      </ul>
    </>
  );
};

export default Navbar;
