import {useState, useContext} from 'react'
import axios from 'axios';
import { SocketContext } from '../../context/socket';


const StartButton = ({player, players}) => {
    // WebSocket Initialization
    const socket = useContext(SocketContext);
    // console.log(socket)
    // console.log(`Active: ${socket.active}`)

    const [clickStart, setStart] = useState(false);
    let startGame = true;

    const handleStartClick = async () => {
      if(player.name === "Moderator"){
        for (player of players){
          if(player.status === false){
            startGame = false
          }
        }
        if(!startGame)
          return
        else{
          
          console.log(player.name + " clicked Start")
          const playerResult = await axios.patch(`http://localhost:8080/gamenight/server/mafia/player/${player.serverCode}/${player.playerID}`)
          const server = await axios.get(`http://localhost:8080/gamenight/server/mafia/${player.serverCode}`)
          socket.emit('mafia-player-ready', server.data, playerResult.data.player)
          setStart(!clickStart)
          return
        }
      }
      console.log(player.name + " clicked Start")
      const playerResult = await axios.patch(`http://localhost:8080/gamenight/server/mafia/player/${player.serverCode}/${player.playerID}`)
      const server = await axios.get(`http://localhost:8080/gamenight/server/mafia/${player.serverCode}`)
      socket.emit('mafia-player-ready', server.data, playerResult.data.player)
      setStart(!clickStart)
    }

  return (
    <>
      { clickStart
      ?
      <div onClick={handleStartClick} className="bg-mafiaRed absolute bottom-0 left-0 right-0 text-white py-3 px-6 md:w-[50%] w-full border border-navy rounded">Not Ready</div> 
      : 
      <div onClick={handleStartClick} className="bg-[#269754] absolute bottom-0 left-0 right-0 color-white py-3 px-6 md:w-[50%] m-auto w-full border border-navy rounded">I'm Ready</div>
      }
    </>
  )
}

export default StartButton