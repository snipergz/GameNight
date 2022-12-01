import {useState, useContext} from 'react'
import axios from 'axios';
import { SocketContext } from '../../context/socket';


const StartButton = ({player, players}) => {
    // WebSocket Initialization
    const socket = useContext(SocketContext);
    // console.log(socket)
    // console.log(`Active: ${socket.active}`)

    const [clickStart, setStart] = useState(false);
    let allReady = true;
    

    const handleStartClick = async () => {
      console.log(player.name + " clicked Start")
      console.log(player)

      // Update the Player's Status to True/False (Ready / Not Ready)
      const playerResult = await axios.patch(`http://localhost:8080/gamenight/server/mafia/player/${player.serverCode}/${player.playerID}`, {
        status: !player.status
      })
      // Get the Updated Server Object with updated player
      const server = await axios.get(`http://localhost:8080/gamenight/server/mafia/${player.serverCode}`)
      
      // Store it into sessionStorage
      sessionStorage.setItem('player', JSON.stringify(playerResult.data.player))
      sessionStorage.setItem('server', JSON.stringify(server.data))
      sessionStorage.setItem('players', JSON.stringify(server.data.players))
      
      // The Moderator can only start the game if there is atleast 7 people (inclusive) and everyone is ready
      if(player.name !== "Moderator"){
        setStart(!clickStart)
        socket.emit('mafia-player-ready', server.data, playerResult.data.player)
      } 
      else {
        // Check that every player is ready
        for (player of players){
          if (player.name !== "Moderator"){
            if(player.status === false){
              console.log(`${player.name} is not Ready`)
              allReady = false
            }
          }
        }
        // Check that every player is ready
        if(!allReady){
          console.log("Everybody must be ready to start the game")
          return
        }
        // Check that there are atleast 7 players
        if(players.length < 7){
          console.log(`There are currently only ${players.length} players, there must be atleast 7`)
          return
        }
        // Start the game
        else{
          setStart(!clickStart)
          socket.emit('mafia-moderator-ready', server.data, playerResult.data.player)
        }
      }
    }

  return (
    <>
      { 
      player.name === "Moderator"
      ?
      <div onClick={handleStartClick} className="bg-[#269754] absolute bottom-0 left-0 right-0 color-white py-3 px-6 md:w-[50%] m-auto w-full border border-navy rounded">Start Game</div>
      :
      clickStart
      ?
      <div onClick={handleStartClick} className="bg-mafiaRed absolute bottom-0 left-0 right-0 text-white py-3 px-6 md:w-[50%] w-full border border-navy rounded">Not Ready</div> 
      : 
      <div onClick={handleStartClick} className="bg-[#269754] absolute bottom-0 left-0 right-0 color-white py-3 px-6 md:w-[50%] m-auto w-full border border-navy rounded">I'm Ready</div>
      }
    </>
  )
}

export default StartButton