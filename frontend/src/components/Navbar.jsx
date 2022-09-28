import React, { useState } from "react";
import { HiChevronDoubleUp, HiOutlineViewList } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <ul className="text-white flex flex-col gap-1 p-2 lg:flex-row  lg:justify-center lg:gap-2">
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
  );
};

export default Navbar;
