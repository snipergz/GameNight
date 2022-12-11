import React from "react";

const Hero = ({ pic, title, titleColor, btnColor, btnOutline }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-between mt-[65px] md:mt-0">
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
        <div className="flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none">
          <h1 className="text-5xl lg:text-6xl font-navFontRS">
            <span className={`${titleColor} leading-3 outline-none`}>
              {title}
            </span>
          </h1>
          <h2 className="text-white text-xl text-center lg:text-left lg:text-2xl my-4">
            An Anywhere and Anytime Solution that brings life to small group
            environments
          </h2>
          <h2 className="text-white text-xl lg:text-3xl my-4">
            Are you ready to have some fun?
          </h2>
          <div className="flex flex-row gap-5 w-full justify-center xl:justify-start">
            <a
              className={`${btnColor} text-white py-3 px-6 min-w-[145px] border border-navy rounded`}
              href="#games"
            >
              Let's Play 👇
            </a>
            <a
              className={`bg-white text-darkPurple py-3 px-6 min-w-[145px] border ${btnOutline} rounded`}
              href="#about"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="">
          <img
            className={`w-[90%] md:w-[75%] mx-auto border border-x-[${titleColor}] border-y-[${titleColor}] rounded-xl`}
            src={pic}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
