import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Mafia from './pages/Mafia';
import Taboo from './pages/Taboo';

function App() {
  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/mafia' element={<Mafia/>}/>
          <Route path='/taboo' element={<Taboo/>}/>
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
