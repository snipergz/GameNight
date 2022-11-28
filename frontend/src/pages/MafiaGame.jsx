import {useState, useContext} from 'react'
import StartButton from '../components/Mafia/StartButton';
import { SocketContext } from '../context/socket'


const MafiaGame = () => {
  // WebSocket Initialization
  const socket = useContext(SocketContext);
  // console.log(socket)
  // console.log(`Active: ${socket.active}`)

  const [loading, setLoading] = useState(true);
  const [server, setServer] = useState([]);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setPlayer] = useState(null)

  // For Initial game server creation
  socket.on("receive-mafia-server", (gameServer, player) => {
    try {
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
    socket.on("receive-mafia-player-update", (gameServer, player) => {
      try {
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

export default MafiaGame