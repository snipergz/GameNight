import axios from 'axios'
import { SocketContext } from '../../context/socket';
import {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';


const JoinForm = ({handleJoinClick}) => {
  // WebSocket Initialization
  const socket = useContext(SocketContext);
  // console.log(socket)
  // console.log(`Active: ${socket.active}`)

  const navigate = useNavigate()

  const joinGame = e =>{
    e.preventDefault();
    const playerName = e.target[0].value
    const serverCode = e.target[1].value

    console.log("Joining Game Server");
    const joinServer = async () => {
      try{
        console.log("...sending ajax create player post");
        const player = await axios.post(`http://localhost:8080/gamenight/server/mafia/player/${serverCode}`,{
          name: playerName,
        });
        if(player.data.status === 'OK'){
          console.log("Storing server to localStorage...")
          const server = await axios.get(`http://localhost:8080/gamenight/server/mafia/${serverCode}`)
          socket.emit('join-room', 
          `\nCLIENT_SIDE_MESSAGE: Player Created, Joining Room ${serverCode}`, server.data, player.data
          )
          navigate('/mafia/server/play')
        }
      } catch (e) {
        console.log(e);
      }
    };
    joinServer();
  };
  
  return (
    <form onSubmit={joinGame} id='joinForm' className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="playerName">Player Name</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="playerName" type="text" placeholder="Player Name"></input>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Server Code</label>
        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="serverCode" type="text" placeholder="*********"></input>
        <p className="text-red-500 text-xs italic">Feel free to use any name that you'd like</p>
      </div>
      <div className="flex items-center justify-between">
        <button type='submit' className="bg-mafiaRed text-white py-3 px-6 min-w-[145px] border border-navy rounded">Join Server</button>
        <button onClick={handleJoinClick} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">Go Back?</button>
      </div>
    </form>
  )
}

export default JoinForm