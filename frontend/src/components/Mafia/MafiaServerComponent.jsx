import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import mafiaHouse from '../../assets/Mafia/mafia-house.jpg';
import JoinForm from './JoinForm';


const MafiaServerComponent = ({gameName}) => {
  const [clickJoinServer, setJoin] = useState(false);
  const handleJoinClick = () => setJoin(!clickJoinServer);

  const createGame = e =>{
    e.preventDefault();

    console.log("Joining Game Server");
    const createServer = async () => {
      try{
        console.log("Creating Mafia Game Server...")
        const gameServer = await axios.post('http://localhost:8080/gamenight/server/mafia', {game: 'Mafia'})
        console.log("Storing server to localStorage...")
        localStorage.setItem('server', JSON.stringify(gameServer))
        console.log("LocalStorage Successfully Set...")
        window.location = `/mafia/server/play`
      } catch (e) {
        console.log("...error");
      }
    };
    createServer();
  };


  return (
    <div className='w-full h-screen flex flex-col justify-between mt-28 md:mt-4'>
      <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
          <div className='flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none'>
            <h1 className='text-5xl lg:text-6xl font-navFontRS text-mafiaRed leading-3 outline-none drop-shadow-mafia mb-4'>Mafia</h1>             
            <div className='flex flex-col md:flex-row gap-5 w-full justify-center xl:justify-start mt-4 md:mt-0'>
              {clickJoinServer ? 
                <JoinForm handleJoinClick={handleJoinClick}/>
                :
                <>
                  <button onClick={createGame} className='bg-mafiaRed text-white py-3 px-6 min-w-[145px] border border-navy rounded'>Create a {gameName} Server </button>
                  <div className='bg-white text-mafiaRed py-3 px-6 min-w-[145px] border border-mafiaRed rounded' onClick={handleJoinClick}>Join a {gameName} Server</div>
                </>
              }
            </div>
          </div>
          <div className=''>
            <img className='w-[90%] md:w-[75%] mx-auto border border-black rounded-xl' src={mafiaHouse} alt="" />
          </div>
        </div>
        <div className="">
          <img
            className="w-[90%] md:w-[75%] mx-auto border border-black rounded-xl"
            src={mafiaHouse}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default MafiaServerComponent
