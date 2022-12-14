import { useEffect } from 'react';
import {useState, useContext} from 'react'
import StartButton from '../components/Mafia/StartButton';
import { SocketContext } from '../context/socket'
import { useNavigate } from 'react-router-dom';

function shuffleArray(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

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
  socket.once("receive-mafia-moderator-ready", (gameServer, player) => {
    try {
      console.log("RECEIVE_MODERATOR_PLAYER_UPDATE")
      const receivedServer = JSON.parse(gameServer)
      const receivedPlayer = JSON.parse(player)
      setServer(receivedServer)
      setPlayers(receivedServer.players)
      setLoading(false)
      if(sessionPlayer.name === "Moderator"){
        setPlayer(receivedPlayer)
      }
      // Update the server and players [] values in sessionStorage
      sessionStorage.setItem('server', JSON.stringify(receivedServer))
      sessionStorage.setItem('players', JSON.stringify(receivedServer.players))

      const playersLength = players.length

      // Based off of 7 players (Including Moderator)
      let roles = ["Mafia", "Civillian", "Doctor", "Civillian", "Detective", "Civillian"]

      if(playersLength === 8 || playersLength === 9){
        roles.append("Mafia")
        roles.append("Civillian")
      }

      if(playersLength >= 10 && playersLength <= 12){
        roles.append("Mafia")
        roles.append("Doctor")
        roles.append("Detective")
        roles.append("Civillian")
      }

      // Assign roles to the players
      const shuffledRoles = shuffleArray(roles)
      
      if(players.length >= 7){
        socket.emit("receive-shuffle-roles", shuffledRoles, player, players)
      }
      // sessionStorage.setItem('players', JSON.stringify(server.players))

    } catch (error) {
      setError(error)
    }
  })

  socket.once("shuffle-complete-start-game", (gameServer, players) => {
    console.log("Starting the game.......")
    const receivedServer = JSON.parse(gameServer)
    const receivedPlayers = JSON.parse(players)
    sessionStorage.setItem('server', JSON.stringify(receivedServer))
    sessionStorage.setItem('players', JSON.stringify(receivedPlayers))

    for(let player of receivedPlayers){
      if(currentPlayer.name === player.name){
        sessionStorage.setItem('player', JSON.stringify(player))
      }
    }

    navigate('/mafia/server/play')
    
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
              <p className='p-4'>
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