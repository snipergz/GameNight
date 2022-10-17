import {useState, useEffect} from 'react'
import axios from 'axios'

const MafiaServer = () => {
  const [loading, setLoading] = useState(true);
  const [server, setServer] = useState([]);
  const [error, setError] = useState(null);
  console.log("Creating Mafia Server...")
  // Create a server
  useEffect(() => {
    const fetch = async() => {
      try{
        console.log("Sending Ajax Call...");
        setLoading(true)
        const result = await axios.post('http://localhost:8080/gamenight/server/mafia')
        console.log("Ajax received...");
        setLoading(false)
        setServer(result.data);
        console.log(result.data);
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
                <p>Your Server Code is: {server.serverCode}</p>
            }          
        </div>
    </>
  )
}

export default MafiaServer