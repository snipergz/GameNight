import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Mafia from "./pages/Mafia";
import MafiaServer from "./pages/MafiaServer";
import Mystery from "./pages/Mystery";
import Server from "./pages/Server";
import Taboo from "./pages/Taboo";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mafia" element={<Mafia />} />
            <Route path="/taboo" element={<Taboo />} />
            <Route path="/mystery" element={<Mystery />} />
            <Route
              path="/mafia/server"
              element={<Server gameName={"Mafia"} />}
            />
            <Route path="/mafia/server/play" element={<MafiaServer />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
