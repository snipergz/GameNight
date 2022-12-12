import React from "react";
import { Link } from "react-router-dom";
import mafiaCard1 from "../../assets/Mafia/mafia-card-1.jpg";
import taboo from "../../assets/Taboo/r.png"
import mystery from "../../assets/MurderMystery/game3.png"

const Games = () => {
  return (
    <section id="games" className="container mx-auto lg:p-4 my-auto md:mt-20">
      <h1 className="text-4xl p-2 text-center text-white">Featured Games:</h1>
      <div className="grid justify-center md:grid-cols-3 max-w-[1240px] m-auto text-dark md:p-2 gap-8 sm:gap-2 ">
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm">
          <img src={mafiaCard1} alt="" />
          <div className="p-4">
            <h3 className="text-2xl">Mafia</h3>
            <p className="mb-4">
              Who's a friend and who's a foe? Get a group of 7 or more and use your wits to figure out
              which members of your group are actually the mafia! Every round is a fierce debate and
              every game is filled with tense moments with fingers pointed every which way!
            </p>
            <Link
              className="block bg-darkPurple text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded"
              to="/mafia"
            >
              Play Mafia
            </Link>
          </div>
        </div>
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm">
          <img src={taboo} alt="" />
          <div className="p-4">
            <h3 className="text-2xl">Taboo</h3>
            <p className="mb-4">
              Get together 2 teams and go head to head to see who can give the best clues! Each team 
              takes rounds trying to figure out secret words, but watch out for words that are taboo! 
            </p>
            <Link
              className="block bg-darkPurple text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded"
              to="/taboo"
            >
              Play Taboo
            </Link>
          </div>
        </div>
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm">
          <img src={mystery} alt="" />
          <div className="p-4">
            <h3 className="text-2xl">Murder Mystery</h3>
            <p className="mb-4">
              Will you be able to make it all the way and survive? This choose your own adventure game
              is sure to keep you on the edge of your seat! You'll come across plenty of paths that force 
              you to choose where you'll go. Choose right and you make it out. Choose wrong and it's game over!
            </p>
            <Link
              className="block bg-darkPurple text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded"
              to="/mystery"
            >
              Play Game
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Games;
