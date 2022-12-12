import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Mafia from './pages/Mafia';
import Taboo from './pages/Taboo';
import Mystery from "./pages/Mystery";
import MafiaServer from './pages/MafiaServer';

import Mystery from './pages/MysteryGame';
import MysteryPlay from './pages/MysteryPlay';
import MafiaLobby from './pages/MafiaLobby';
import {SocketContext, socket} from '../src/context/socket';
import MafiaGame from './pages/MafiaGame';


function App() {
  return (
    <>

    <SocketContext.Provider value={socket}>  
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/mafia' element={<Mafia/>}/>
            <Route path='/taboo' element={<Taboo/>}/>
            <Route path='/mafia/server' element={<MafiaServer gameName={"Mafia"}/>}/>
            <Route path='/mafia/server/lobby' element={<MafiaLobby/>}/>
            <Route path='/mafia/server/play' element={<MafiaGame/>}/>
            <Route path="/mystery" element={<Mystery />} />
            <Route path='/MysteryPlay' element ={<MysteryPlay/>}/>
          </Routes>
        </div>
      </Router>
    </SocketContext.Provider>
    </>
  );
}

export default App;
