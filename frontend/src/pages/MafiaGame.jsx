import React, {useContext} from 'react'
import { SocketContext } from '../context/socket'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Civillian from '../assets/Mafia/civillian-card.jpg'
import Detective from "../assets/Mafia/detective-card-1.jpg";
import Doctor from "../assets/Mafia/doctor-card-1.jpg";
import Mafia from "../assets/Mafia/mafia-card-2.jpg";

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
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 p-4'>
                {sessionPlayers.filter(plr => plr.name !== "Moderator").map(p => {
                  return <div className='relative text-center'>
                            <img key={p.playerID} alt="player's role card" src={p.role === "Mafia" ? Mafia
                                                                                                  :  p.role === "Doctor" ? Doctor
                                                                                                  :  p.role === "Detective" ? Detective
                                                                                                  : Civillian} 
                                                                                                className="m-auto"/>
                        <p className='absolute top-[0%] left-[50%] translate-x-[-50%] translate-y-[-0%] p-[0.5rem] z-1 w-[auto] sm:w-[50%] bg-black'>{p.name}</p>
                  </div>
                })}
              </div>
            </div>
            :
            <div>
              <h2 className='text-3xl mb-4'>Role: {sessionPlayer.role}</h2>
              <img className='w-full h-auto' src={sessionPlayer.role === "Mafia" ? Mafia 
                                                : sessionPlayer.role === "Doctor" ? Doctor 
                                                : sessionPlayer.role === "Detective" ? Detective 
                                                : Civillian} 
                                              alt="User's Player Card" />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default MafiaGame