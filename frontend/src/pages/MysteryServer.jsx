import {useState, useEffect} from 'react'
import mysteryStartButton from '../components/Mystery/mysteryStartButton'

const MysteryServer = () => {
    const localPlayer = JSON.parse(localStorage.getItem('player'))
    const player = localPlayer.player.player
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const [server, setServer] = useState([]);
    const [error, setError] = useState(null);
    // console.log("Creating Mystery Server...")
    // Create a server
    useEffect(() => {
      const fetch = async() => {
        try{
          const localServer = localStorage.getItem('server')
          if(localServer){
            setLoading(false)
            const JSONServer = JSON.parse(localServer)
            // console.log(JSONServer.data)
            setServer(JSONServer.data)
            setPlayers(JSONServer.data.players)
          } else {
            setLoading(false)
            setError("No local server please go back and press 'Create a Game'")
          }
        }catch(error){
          setError("Unable to create server, please try again later.")
        }
      }; 
      fetch();
    }, [players]);
  
    return (
      <>
          <div className='text-white relative h-full'>
              {loading
                  ?
                  <h2>Loading...</h2>
                  :
                  error
                  ?
                  <h2>Error, {error}</h2>
                  :   
                  <div>
                    <p className='mt-4 text-center'>Your Server Code is: {server.serverCode}</p>
                    <p className='mt-8 text-center'>Players in the lobby:</p>
                    {players.map(
                      player => 
                        <p className='text-center'>{player.name} Not Ready</p>
                      ) 
                    }
                      <mysteryStartButton player={player}/>
                  </div>
              }          
          </div>
      </>
    )
  }
  
  export default MysteryServer