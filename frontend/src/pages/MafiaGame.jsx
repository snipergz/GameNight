import React, {useContext} from 'react'
import { SocketContext } from '../context/socket'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import civillianCard from '../assets/Mafia/civillian-card.jpg'
import detectiveCard1 from "../assets/Mafia/detective-card-1.jpg";
import doctorCard1 from "../assets/Mafia/doctor-card-1.jpg";
import mafiaCard2 from "../assets/Mafia/mafia-card-2.jpg";

function MafiaGame() {
  // WebSocket Initialization
  const socket = useContext(SocketContext);
  // console.log(socket)
  console.log(`Mafia Game Socket Active Status: ${socket.active}`)
  const navigate = useNavigate()

  // Check what active client server and player
  const sessionServer = JSON.parse(sessionStorage.getItem('server'))
  const sessionPlayers = JSON.parse(sessionStorage.getItem('players'))
  const sessionPlayer = JSON.parse(sessionStorage.getItem('player'))

  // If the player is the moderator, display the grid

  // If the player is not the moderator, display their card and status

  // Considerable improvements, show the amount of people still alive
  return (
    <>
    <Navbar/>
      <div className='text-white text-center w-full h-screen flex flex-col justify-between'>
        <div className='max-w-[1240px] m-auto'>
          {
            sessionPlayer.name === "Moderator" 
            ?
            <div>
              <h2 className='text-3xl mb-4'>Role: Moderator</h2> 
              <div className='grid grid-cols-3 gap-4 p-4'>
                {sessionPlayers.map(p => {
                  return <img key={p.playerID} alt="moderator card" src={civillianCard} className="m-auto"/>
                })}
              </div>
            </div>
            :
            <div>You are {sessionPlayer.role}</div>
          }
        </div>
      </div>
    </>
  )
}

export default MafiaGame