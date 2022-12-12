import axios from "axios";
import { useState } from "react";
import mystPic from "../assets/MurderMystery/game3.png";
import Navbar from "../components/Navbar";
import JoinForm from "./JoinForm";

const MysteryServer = ({ gameName }) => {
  const [clickJoinServer, setJoin] = useState(false);
  const handleJoinClick = () => setJoin(!clickJoinServer);
  const createGame = (e) => {
    e.preventDefault();

    console.log("Joining Game Server");
    const createServer = async () => {
      try {
        console.log("Creating Mystery Game Server...");
        const gameServer = await axios.post(
          "http://localhost:8080/gamenight/server/mystery",
          { game: "Mafia" }
        );
        console.log("Storing server to localStorage...");
        localStorage.setItem("server", JSON.stringify(gameServer));
        console.log("LocalStorage Successfully Set...");
        window.location = `/mystery/server/play`;
      } catch (e) {
        console.log("...error");
      }
    };
    createServer();
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex flex-col justify-between mt-28 md:mt-4">
        <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
          <div className="flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none md:ml-4 lg:ml-6">
            <h1 className="text-5xl lg:text-6xl font-navFontRS text-mysteryYellow leading-3 outline-none drop-shadow-mafia mb-1 md:mb-4 lg:mb-0 xl:mb-1 md:w-full">
              Mystery
            </h1>
            <div className="flex flex-col gap-3 xl:gap-5 w-auto md:w-full justify-center xl:justify-start mt-4 md:mt-1 ">
              {clickJoinServer ? (
                <JoinForm handleJoinClick={handleJoinClick} />
              ) : (
                <>
                  <button
                    onClick={createGame}
                    className="bg-mysteryYellow text-white py-1 lg:py-3 px-20 min-w-[145px] border border-navy rounded hover:cursor-pointer"
                  >
                    Create a {gameName} Server
                  </button>
                  <button
                    className="bg-white text-mysteryYellow py-1 lg:py-3 px-20 min-w-[145px] border border-mysteryYellow rounded hover:cursor-pointer"
                    onClick={handleJoinClick}
                  >
                    Join a {gameName} Server
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="">
            <img
              className="w-[90%] md:w-[75%] mx-auto border border-black rounded-xl"
              src={mystPic}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MysteryServer;