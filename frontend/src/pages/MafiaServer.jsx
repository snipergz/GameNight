import {useState, useEffect} from 'react'
import StartButton from '../components/Mafia/StartButton';
import {BiRefresh} from 'react-icons/bi'
import axios from 'axios';

const MafiaServer = () => {
  const localPlayer = JSON.parse(localStorage.getItem('player'))
  const localServer = JSON.parse(localStorage.getItem('server'))
  console.log(localServer)
  const player = localPlayer.player
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [server, setServer] = useState([]);
  const [error, setError] = useState(null);

  const handleUpdatePlayers = e => {
    e.preventDefault()
    console.log("Updating PlayerList")

    const updatePlayers = async () => {
      try {
        const gameServer = await axios.get(`http://localhost:8080/gamenight/server/mafia/${localServer.serverCode}`)
        console.log(gameServer.data)
        setPlayers(gameServer.data.players)
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    updatePlayers();
  };

  // console.log("Creating Mafia Server...")
  // Create a server
  useEffect(() => {
    const fetch = async() => {
      try{
        const localServer = localStorage.getItem('server')
        if(localServer){
          setLoading(false)
          const JSONServer = JSON.parse(localServer)
          // console.log(JSONServer.data)
          setServer(JSONServer)
          setPlayers(JSONServer.players)
        } else {
          setLoading(false)
          setError("No local server please go back and press 'Create a Game'")
        }
      }catch(error){
        setError("Unable to create server, please try again later.")
      }
    }; 
    fetch();
  }, []);

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
                  <p className='mt-8 text-center'>Players in the lobby:</p>
                  <p className='text-center'>Refresh Player List <BiRefresh onClick={handleUpdatePlayers} className='inline' /></p>
                  {players.map(
                    player => 
                      <p className='text-center'>{player.name} {player.status === true ? "Ready" : "Not Ready"}</p>
                    ) 
                  }
                    <StartButton player={player} players={players}/>
                </div>
            }          
        </div>
    </>
  )
}

export default MafiaServer