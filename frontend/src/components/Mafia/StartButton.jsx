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
      console.log(player)
      // The Moderator can only start the game if there is atleast 7 people (inclusive) and everyone is ready
      if(player.name === "Moderator"){
        for (player of players){
          if (player.name === "Moderator")
            continue
          else{
            if(player.status === false){
              console.log(`${player.name} is not Ready`)
              startGame = false
            }
          }
        }
        if(!startGame || players.length < 7){
          console.log("Not enough players and not all are ready")
          return
        }
        else{
          console.log(player.name + " clicked Start")
          const playerResult = await axios.patch(`http://localhost:8080/gamenight/server/mafia/player/${player.serverCode}/${player.playerID}`, {
            status: !player.status
          })

          const server = await axios.get(`http://localhost:8080/gamenight/server/mafia/${player.serverCode}`)

          sessionStorage.setItem('player', JSON.stringify(playerResult.data.player))
          sessionStorage.setItem('server', JSON.stringify(server.data))
          sessionStorage.setItem('players', JSON.stringify(server.data.players))

          socket.emit('mafia-player-ready', server.data, playerResult.data.player)
          setStart(!clickStart)
          return
        }
      }
      console.log(player.name + " clicked Start")
      const playerResult = await axios.patch(`http://localhost:8080/gamenight/server/mafia/player/${player.serverCode}/${player.playerID}`, {
        status: !player.status
      })
      const server = await axios.get(`http://localhost:8080/gamenight/server/mafia/${player.serverCode}`)
      sessionStorage.setItem('server', JSON.stringify(server.data))
      sessionStorage.setItem('players', JSON.stringify(server.data.players))
      sessionStorage.setItem('player', JSON.stringify(playerResult.data.player))
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