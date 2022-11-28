import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Mafia from './pages/Mafia';
import Taboo from './pages/Taboo';
import Mystery from "./pages/Mystery";
import MafiaServer from './pages/MafiaServer';
import MafiaGame from './pages/MafiaGame';
import {SocketContext, socket} from '../src/context/socket';

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
            <Route path='/mafia/server/play' element={<MafiaGame/>}/>
            <Route path="/mystery" element={<Mystery />} />
          </Routes>
        </div>
      </Router>
    </SocketContext.Provider>

    </>
  );
}

export default App;
