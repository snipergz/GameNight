import React from "react";
import detectiveCard1 from "../../assets/Mafia/detective-card-1.jpg";
import doctorCard1 from "../../assets/Mafia/doctor-card-1.jpg";
import mafiaCard2 from "../../assets/Mafia/mafia-card-2.jpg";
import civillian from "../../assets/Mafia/civillian-card.jpg"
import moderator from "../../assets/Mafia/moderator.jpg"

const Characters = () => {
  return (
    <section
      id="mafia-characters"
      className="container mx-auto md:p-4 my-auto md:mt-20"
    >
      <h1 className="text-4xl p-2 text-white text-center">Characters:</h1>
      <div className="grid md:grid-cols-3 sm:w-max md:w-auto md:max-w-[1240px] m-auto text-dark gap-8 sm:gap-2 justify-center">
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm">
          <img src={mafiaCard2} alt="" />
          <div className="p-4">
            <h3 className="text-2xl">Mafia</h3>
            <p className="mb-4">
              As a member of the Mafia your job is to eliminate the non mafia
              members of your party while trying to convince them that you are
              not a Mafioso/Mafiosa.
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm">
          <img src={doctorCard1} alt="" />
          <div className="p-4">
            <h3 className="text-2xl">Doctor</h3>
            <p className="mb-4">
              The Doctor has the ability to either protect themselves or any
              other player once per turn but can only save themself once in a game.
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm">
          <img src={detectiveCard1} alt="" />
          <div className="p-4">
            <h3 className="text-2xl">Detective</h3>
            <p className="mb-4">
              During your turn as the Detective, you can verify whether your
              suspicion is correct and find out if your suspect is a member of
              the mafia.
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm">
          <img src={moderator} alt="" />
          <div className="p-4">
            <h3 className="text-2xl">Moderator</h3>
            <p className="mb-4">
              As the Moderator, your role is to guide, moderate, and create the storyline of the game 
              ensuring that the rules are kept and the stories made are fun.
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm">
          <img src={civillian} alt="" />
          <div className="p-4">
            <h3 className="text-2xl">Civillian</h3>
            <p className="mb-4">
              As a Civillian, your goal is to voice your opinions on who you suspect the Mafia is
              and vote with your community to get rid of them, but make sure to do so wisely or 
              you may make a crucial mistake.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Characters;
