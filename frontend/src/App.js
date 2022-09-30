import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Mafia from './pages/Mafia';
import Taboo from './pages/Taboo';
import Server from './pages/Server';

function App() {
  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/mafia' element={<Mafia/>}/>
          <Route path='/taboo' element={<Taboo/>}/>
          <Route path='/server' element={<Server/>}/>
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
