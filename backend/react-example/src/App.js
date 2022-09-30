import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Home from "./Home"
import startNew from "./startNew"
import Join from "./Join"

let next_id = 100;

function App() {
  console.log("APP");

  console.log('rendering');
  
  return (
    <Router>
      <nav>
        <Link to="/startNew"> Start New Game </Link>
        <Link to="/Join"> Join Game </Link>
        <Link to="/"> Home </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/startNew" element={<startNew />}/>
        <Route path="/Join/:gameId" element={<Join />}/>
      </Routes>
    </Router>
  );
}

export default App;
