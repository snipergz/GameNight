import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom"



function Join() {
  console.log("Join");

  console.log('rendering');
  
    let { gameId } = useParams();

  return (
    
    <div className="container">

   

    <div className="col-auto">
          gameId is {gameId}
    </div>

    <div className="col-auto">
          -  x  o
    </div>
    <div className="col-auto">
          -  o  -
    </div>
    <div className="col-auto">
          -  o  -
    </div>

    </div>
  );
}

export default Join;
