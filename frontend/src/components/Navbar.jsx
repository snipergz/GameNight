import React, { useState } from "react";
import { HiChevronDoubleUp, HiOutlineViewList } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <>
      <div
        className="md:hidden mr-4 p-2 justify-start text-white"
        onClick={handleClick}
      >
        {!nav ? <HiOutlineViewList /> : <HiChevronDoubleUp />}
      </div>

      <ul
        className={
          !nav
            ? "invisible lg:visible text-white flex  flex-row  justify-center gap-2"
            : "text-white flex flex-col gap-1 p-2 "
        }
      >
        <Link to="/home" className="hover:text-neonBlue">
          Home
        </Link>
        <Link to="/mafia" className="hover:text-neonPink ">
          Mafia
        </Link>
        <Link to="/taboo" className="hover:text-neonBlue ">
          Taboo
        </Link>
        <button className="hover:text-neonPink text-left">Sign In</button>
        <button className="hover:text-neonBlue text-left">Sign Up</button>
      </ul>
    </>
  );
};

export default Navbar;
