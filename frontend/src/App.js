import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { socket, SocketContext } from "../src/context/socket";
import Home from "./pages/Home";
import Mafia from "./pages/Mafia";
import MafiaGame from "./pages/MafiaGame";
import MafiaLobby from "./pages/MafiaLobby";
import MafiaServer from "./pages/MafiaServer";
import Mystery from "./pages/Mystery";
import MysteryGame from "./pages/MysteryGame";
import MysteryServer from "./pages/MysteryServer";
import Taboo from "./pages/Taboo";
function App() {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/mafia" element={<Mafia />} />
              <Route path="/taboo" element={<Taboo />} />
              <Route
                path="/mafia/server"
                element={<MafiaServer gameName={"Mafia"} />}
              />
              <Route path="/mafia/server/lobby" element={<MafiaLobby />} />
              <Route path="/mafia/server/play" element={<MafiaGame />} />
              <Route path="/mystery" element={<Mystery />} />
              <Route
                path="/mystery/server"
                element={<MysteryServer gameName={"Mystery"} />}
              />
              <Route path="/mystery/server/play" element={<MysteryGame />} />
            </Routes>
          </div>
        </Router>
      </SocketContext.Provider>
    </>
  );
}

export default App;
