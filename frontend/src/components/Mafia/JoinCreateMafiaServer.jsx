import {useState, useContext} from 'react'
import { SocketContext } from '../../context/socket';
import mafiaHouse from '../../assets/Mafia/mafia-house.jpg'
import JoinForm from './JoinForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const JoinCreateMafiaServer = ({gameName}) => {
  const [clickJoinServer, setJoin] = useState(false);
  const handleJoinClick = () => setJoin(!clickJoinServer);

  const sessionServer = JSON.parse(sessionStorage.getItem('server'))
  const sessionPlayers = JSON.parse(sessionStorage.getItem('players'))
  const sessionPlayer = JSON.parse(sessionStorage.getItem('player'))

  const navigate = useNavigate()

  // Passed WebSocket Initialization
  const socket = useContext(SocketContext);
  console.log(socket)
  console.log(`Active: ${socket.active}`)

  const createGame = e =>{
    e.preventDefault();
    const createServer = async () => {
      if(socket.active){
        try{
          console.log("Socket is Active...")
          console.log("Creating New Mafia Game Server...")
          let gameServer = await axios.post('http://localhost:8080/gamenight/server/mafia', {game: 'Mafia'})
          console.log("Game Server Successfully Created...")
          console.log("Sending ajax create player Post Request...");
          const player = await axios.post(`http://localhost:8080/gamenight/server/mafia/player/${gameServer.data.serverCode}`,{
            name: "Moderator",
          });
          gameServer = await axios.get(`http://localhost:8080/gamenight/server/mafia/${gameServer.data.serverCode}`)

          if(player.data.status === 'OK'){
            console.log("Moderator Player Successfully Created...")

            // Session Storage
            // FIRST DELETE PREVIOUS SESSION STORED GAME
            if(sessionServer){
              sessionStorage.removeItem('server')
            }
            if(sessionPlayers){
              sessionStorage.removeItem('players')
            }
            if(sessionPlayer){
              sessionStorage.removeItem('player')
            }
            
            sessionStorage.setItem('player', JSON.stringify(player.data.player))
            sessionStorage.setItem('server', JSON.stringify(gameServer.data))
            sessionStorage.setItem('players', JSON.stringify(gameServer.data.players))

            // WebSocket Communication to tell the server that a mafia server has been created
            socket.emit('create-mafia-server', 
            "\nCLIENT_SIDE_MESSAGE: Mafia Game Server Created", gameServer.data, player.data
            )

            navigate('/mafia/server/lobby')
          }
        } catch (e) {
          console.log("...error");
        }
      }
    };
    createServer();
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between mt-28 md:mt-4">
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
        <div className="flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none md:ml-4 lg:ml-0">
          <h1 className="text-5xl lg:text-6xl font-navFontRS text-mafiaRed leading-3 outline-none drop-shadow-mafia mb-4 md:w-full">
            Mafia
          </h1>
          <div className="flex flex-col gap-5 w-full justify-center xl:justify-start mt-4 md:mt-1 ">
            {clickJoinServer ? (
              <JoinForm handleJoinClick={handleJoinClick} />
            ) : (
              <>
                <button
                  onClick={createGame}
                  className="bg-mafiaRed text-white py-2 lg:py-3 px-6 min-w-[145px] border border-navy rounded hover:cursor-pointer "
                >
                  Create a {gameName} Server
                </button>
                <button
                  className="bg-white text-mafiaRed py-2 lg:py-3 px-6 min-w-[145px] border border-mafiaRed rounded hover:cursor-pointer"
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
            src={mafiaHouse}
            alt=""
          />
        </div>
      </div>
    </div>
    
  )
}

export default JoinCreateMafiaServer