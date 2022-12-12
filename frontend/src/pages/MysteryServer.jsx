<<<<<<< HEAD
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
=======
import {useState, useEffect} from 'react'
import mysteryStartButton from '../components/Mystery/mysteryStartButton'

const MysteryServer = () => {
    const localPlayer = JSON.parse(localStorage.getItem('player'))
    const player = localPlayer.player.player
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const [server, setServer] = useState([]);
    const [error, setError] = useState(null);
    // console.log("Creating Mystery Server...")
    // Create a server
    useEffect(() => {
      const fetch = async() => {
        try{
          const localServer = localStorage.getItem('server')
          if(localServer){
            setLoading(false)
            const JSONServer = JSON.parse(localServer)
            // console.log(JSONServer.data)
            setServer(JSONServer.data)
            setPlayers(JSONServer.data.players)
          } else {
            setLoading(false)
            setError("No local server please go back and press 'Create a Game'")
          }
        }catch(error){
          setError("Unable to create server, please try again later.")
        }
      }; 
      fetch();
    }, [players]);
  
    return (
      <>
          <div className='text-white relative h-full'>
              {loading
                  ?
                  <h2>Loading...</h2>
                  :
                  error
                  ?
                  <h2>Error, {error}</h2>
                  :   
                  <div>
                    <p className='mt-4 text-center'>Your Server Code is: {server.serverCode}</p>
                    <p className='mt-8 text-center'>Players in the lobby:</p>
                    {players.map(
                      player => 
                        <p className='text-center'>{player.name} Not Ready</p>
                      ) 
                    }
                      <mysteryStartButton player={player}/>
                  </div>
              }          
          </div>
      </>
    )
  }
  
  export default MysteryServer
>>>>>>> a58ddf3a0c0367d0dd7a354ab7dd9178dd880c00
