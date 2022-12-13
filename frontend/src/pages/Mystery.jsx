import React from "react";
import mysteryPic from "../assets/MurderMystery/game3.png";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Rules from '../components/Mystery/Rules'

function Mystery() {
  return (
    <>
      <Navbar />
      <Hero
        pic={mysteryPic}
        title={"Murder Mystery"}
        titleColor={"text-mysteryYellow"}
        btnColor={"bg-mysteryYellow"}
        btnOutline={"outline-mysteryYellow"}
      />

      <Rules/>
    </>
  );
}

export default Mystery;
