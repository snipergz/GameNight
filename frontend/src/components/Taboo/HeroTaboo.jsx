import React from "react";
import tabooLogo from "../../assets/Taboo/r.png";

const HeroTaboo = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
        <div className="flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none">
          <h1 className="text-5xl lg:text-6xl font-navFontRS text-tabooPink leading-3 outline-none drop-shadow-mafia">
            Taboo
          </h1>
          <h2 className="text-white text-xl lg:text-3xl my-4 text-center">
            A Competetive Game of Quick Thinking and Smart Guesses
          </h2>
          <div className="flex flex-row gap-5 w-full justify-center xl:justify-start">
            <a
              className="bg-tabooPink text-white py-3 px-6 min-w-[145px] border border-navy rounded"
              href="#"
            >
              Let's Play 👇
            </a>
            <a
              className="bg-white text-tabooPink py-3 px-6 min-w-[145px] border border-tabooPink rounded"
              href="#taboo-about"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="">
          <img
            className="w-[90%] md:w-[75%] mx-auto border border-black rounded-xl"
            src={tabooLogo}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroTaboo;
