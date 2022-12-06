import { useEffect } from 'react';
import {useState, useContext} from 'react'
import StartButton from '../components/Mafia/StartButton';
import { SocketContext } from '../context/socket'
import { useNavigate } from 'react-router-dom';
import detectiveCard1 from "../assets/Mafia/detective-card-1.jpg";
import doctorCard1 from "../assets/Mafia/doctor-card-1.jpg";
import mafiaCard2 from "../assets/Mafia/mafia-card-2.jpg";
import civillianCard from '../assets/Mafia/civillian-card.jpg'

/* 
  MAJOR PROBLEMS BEACUSE THE GAME IS NOT STORED IN SESSION

  - You can't get unready
  - You can't refresh the page
  - 
*/

const MafiaLobby = () => {
  // WebSocket Initialization
  const socket = useContext(SocketContext);
  // console.log(socket)
  console.log(`Mafia Game Socket Active Status: ${socket.active}`)
  const navigate = useNavigate()

  const sessionServer = JSON.parse(sessionStorage.getItem('server'))
  const sessionPlayers = JSON.parse(sessionStorage.getItem('players'))
  const sessionPlayer = JSON.parse(sessionStorage.getItem('player'))

  const [loading, setLoading] = useState(true);
  const [server, setServer] = useState([]);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setPlayer] = useState(null)

  console.log("Page Initial Values: ")
  console.log(server)
  console.log(players)
  console.log(currentPlayer)

  // For Initial game server creation
  socket.on("receive-mafia-server", (gameServer, player) => {
    try {
      console.log("RECEIVE_MAFIA_SERVER")
      const receivedServer = JSON.parse(gameServer)
      const receivedPlayer = JSON.parse(player)
      setServer(receivedServer)
      setPlayers(receivedServer.players)
      setPlayer(receivedPlayer.player)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
  })

  // For Players joining room
  socket.on("receive-mafia-player", (gameServer, player) => {
    try {
      console.log("RECEIVE_MAFIA_PLAYER")
      const receivedServer = JSON.parse(gameServer)
      const receivedPlayer = JSON.parse(player)
      setServer(receivedServer)
      setPlayers(receivedServer.players)
      if(sessionPlayer.name === receivedPlayer.name){
        setPlayer(receivedPlayer)
      }
      setLoading(false)
      // Update the server and players [] values in sessionStorage
      sessionStorage.setItem('server', JSON.stringify(receivedServer))
      sessionStorage.setItem('players', JSON.stringify(receivedServer.players))
    } catch (error) {
      setError(error)
    }
  })

  // For Players joining room
  socket.on("receive-mafia-player-update", (gameServer, player) => {
    try {
      console.log("RECEIVE_MAFIA_PLAYER_UPDATE")
      const receivedServer = JSON.parse(gameServer)
      const receivedPlayer = JSON.parse(player)
      setServer(receivedServer)
      setPlayers(receivedServer.players)
      setLoading(false)
      if(sessionPlayer.name === receivedPlayer.name){
        setPlayer(receivedPlayer)
      }
      // Update the server and players [] values in sessionStorage
      sessionStorage.setItem('server', JSON.stringify(receivedServer))
      sessionStorage.setItem('players', JSON.stringify(receivedServer.players))
    } catch (error) {
      setError(error)
    }
  })

  socket.on("mafia-reconnect", (msg) => {
    console.log(msg)
  })

  // Moderater has pressed ready and game will begin
  socket.on("receive-mafia-moderator-ready", (gameServer, player) => {
    try {
      console.log("RECEIVE_MAFIA_PLAYER_UPDATE")
      const receivedServer = JSON.parse(gameServer)
      const receivedPlayer = JSON.parse(player)
      setServer(receivedServer)
      setPlayers(receivedServer.players)
      setLoading(false)
      setPlayer(receivedPlayer)
      if(sessionPlayer.name === "Moderator"){
        setPlayer(receivedPlayer)
      }
      // Update the server and players [] values in sessionStorage
      sessionStorage.setItem('server', JSON.stringify(receivedServer))
      sessionStorage.setItem('players', JSON.stringify(receivedServer.players))

      const playersLength = players.length

      // Based off of 7 players (Including Moderator)
      let maxMafiaCount = 1
      let maxDoctorCount = 1
      let maxDetectiveCount = 1
      let maxCivillianCount = 3

      if(playersLength === 8 || playersLength === 9){
        maxMafiaCount = 2
        maxCivillianCount = 4
      }

      if(playersLength >= 10 && playersLength <= 12){
        maxMafiaCount = 2
        maxDoctorCount = 2
        maxDetectiveCount = 2
        maxCivillianCount = 4
      }

      const roles = ["Mafia", "Doctor", "Detective", "Civillian"]

      // Assign roles to the players
      for(let i = 1; i < playersLength; i++){
        let random = Math.floor(Math.random() * roles.length)
        let role = roles[random]
        console.log(`Random Role Chosen: ${role}`)
        console.log(`Remaining Mafia: ${maxMafiaCount}, Doctor: ${maxDoctorCount}, Detective: ${maxDetectiveCount}, Civillian: ${maxCivillianCount}`)

        if(role === "Mafia"){
          players[i].role = "Mafia"
          maxMafiaCount -= 1
          if(maxMafiaCount === 0){
            roles.splice(random, 1)
          }
        } else if(role === "Doctor"){
          players[i].role = "Doctor"
          maxDoctorCount -=1
          if(maxDoctorCount === 0){
            roles.splice(random, 1)
          }
        } else if(role === "Detective"){
          players[i].role = "Detective"
          maxDetectiveCount -= 1
          if(maxDetectiveCount === 0){
            roles.splice(random, 1)
          }
        } else {
          players[i].role = "Civillian"
          maxCivillianCount -= 1
          if(maxCivillianCount === 0){
            roles.splice(random, 1)
          }
        }      
      }
      
      console.log(players)

      sessionStorage.setItem('players', JSON.stringify(players))

      navigate('/mafia/server/play')
    } catch (error) {
      setError(error)
    }
  })

  useEffect(() => {
    let data=window.performance.getEntriesByType("navigation")[0].type;
    console.log(data);
    if(data === "reload"){
      socket.emit('mafia-reload', "CLIENT_SIDE_MESSAGE: MAFIA page reloaded", sessionServer)
    }

    if(sessionServer !== undefined){
      setServer(sessionServer)
    } 
    if(sessionPlayers !== undefined){
      setPlayers(sessionPlayers)
    }
    if(sessionPlayer !== undefined){
      setPlayer(sessionPlayer)
    }
    setLoading(false)
  }, [])
  return (
    <>
      <div className='text-white'>

        {loading
          ?
          <h2>Loading...</h2>
          :
          error
          ?
          <h2>Error, {error}</h2>
          :           
            <div className='relative h-screen'>
              <p className='text-center'>Your Server Code is: {server.serverCode}</p>
              <p>
                In order to start the game, there must be atleast 7 players in total and a maximum of 12 
                in the lobby with everyone being ready. Once everyone is ready, the moderator can start the game.
              </p>
              <p className='mt-8 text-center'>Players in the lobby: {server.players.length}</p>
              {players.map(
                player => 
                  <p key={player.playerID} className='text-center'>{player.name} {player.status === true ? "Ready" : "Not Ready"}</p>
                ) 
              }
              <StartButton player={currentPlayer} players={players}/>
            </div>
        }
      </div>
    </>
  )
  // const [loading, setLoading] = useState(true);
  // const [players, setPlayers] = useState([]);

  // const handleUpdatePlayers = e => {
  //   e.preventDefault()
  //   console.log("Updating PlayerList")

  //   const updatePlayers = async () => {
  //     try {
  //       const gameServer = await axios.get(`http://localhost:8080/gamenight/server/mafia/${localServer.serverCode}`)
  //       console.log(gameServer.data)
  //       setPlayers(gameServer.data.players)
  //     } catch (error) {
  //       console.log(error)
  //       setError(error)
  //     }
  //   }
  //   updatePlayers();
  // };

  // // console.log("Creating Mafia Server...")
  // // Create a server
  // useEffect(() => {
  //   const fetch = async() => {
  //     try{
  //       const localServer = localStorage.getItem('server')
  //       if(localServer){
  //         setLoading(false)
  //         const JSONServer = JSON.parse(localServer)
  //         // console.log(JSONServer.data)
  //         setServer(JSONServer)
  //         setPlayers(JSONServer.players)
  //       } else {
  //         setLoading(false)
  //         setError("No local server please go back and press 'Create a Game'")
  //       }
  //     }catch(error){
  //       setError("Unable to create server, please try again later.")
  //     }
  //   }; 
  //   fetch();
  // }, []);
}

export default MafiaLobby