import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"



function startNew() {
  console.log("startNew");

  console.log('rendering');
  
  return (
    
    <div className="container">

    <div className="col-auto">
          First
    </div>

    <div className="col-auto">
          x  x  x
    </div>
    <div className="col-auto">
          o  o  o
    </div>
    <div className="col-auto">
          x  x  x
    </div>

    </div>
  );
}

export default startNew;
