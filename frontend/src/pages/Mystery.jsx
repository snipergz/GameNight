import React from "react";
import mysteryPic from "../assets/MurderMystery/game3";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
function Mystery() {
  return (
    <>
      <Navbar />
      <Hero
        pic={mysteryPic}
        title={"Mystery"}
        titleColor={"text-mysteryYellow"}
        btnColor={"bg-mysteryYellow"}
        btnOutline={"outline-mysteryYellow"}
      />
    </>
  );
}

export default Mystery;
