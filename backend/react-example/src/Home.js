import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"



function Home() {
  console.log("Home");

  console.log('rendering');
  
    let navigate = useNavigate();

    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${name}`)
      }

  return (
     
    <div className="container">

    <h1>Game Night!</h1>

    <tr>
    <button onClick={() => {
        navigate("/startNew");
    }}
    
    >
        {""}
        Create New Game
        </button> 
    </tr>

    <tr>
    <button type="button"><a href="/Join/game123">Join Game</a></button>
  
    </tr>

    <tr>
    <button type="button"><a href="/Join/game123">Join Game</a></button>
    <form>
      <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </form>
    </tr>

    </div>

  );
}

export default Home;
