import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/socket";

const JoinForm = ({ handleJoinClick }) => {
  // WebSocket Initialization
  const socket = useContext(SocketContext);
  // console.log(socket)
  // console.log(`Active: ${socket.active}`)

  const navigate = useNavigate();

  const sessionServer = JSON.parse(sessionStorage.getItem("server"));
  const sessionPlayers = JSON.parse(sessionStorage.getItem("players"));
  const sessionPlayer = JSON.parse(sessionStorage.getItem("player"));

  const joinGame = (e) => {
    e.preventDefault();
    const playerName = e.target[0].value;
    const serverCode = e.target[1].value;

    console.log("Joining Game Server");
    const joinServer = async () => {
      try {
        console.log("...sending ajax create player post");
        const player = await axios.post(
          `http://localhost:8080/gamenight/server/mafia/player/${serverCode}`,
          {
            name: playerName,
          }
        );
        if (player.data.status === "OK") {
          const server = await axios.get(
            `http://localhost:8080/gamenight/server/mafia/${serverCode}`
          );

          sessionStorage.setItem("player", JSON.stringify(player.data.player));
          sessionStorage.setItem("server", JSON.stringify(server.data));
          sessionStorage.setItem(
            "players",
            JSON.stringify(server.data.players)
          );

          socket.emit(
            "join-room",
            `\nCLIENT_SIDE_MESSAGE: Player Created, Joining Room ${serverCode}`,
            server.data,
            player.data
          );
          setIsError(false);
          navigate("/mafia/server/lobby");
        }
      } catch (e) {
        console.log(e);
        setIsError(true);
      }
    };
    joinServer();
  };
  const [isError, setIsError] = useState(false);
  return (
    <form
      onSubmit={joinGame}
      id="joinForm"
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          for="playerName"
        >
          Player Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="playerName"
          type="text"
          placeholder="Player Name"
        ></input>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Server Code
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          name="serverCode"
          type="text"
          placeholder="*********"
        ></input>
        <p className="text-red-500 text-xs italic">
          Feel free to use any name that you'd like
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-mafiaRed text-white py-3 px-6 min-w-[145px] border border-navy rounded"
        >
          Join Server
        </button>
        <p className={`text-mafiaRed ${isError ? "visible" : "invisible"}`}>
          Your server code is incorrect
        </p>
        <button
          onClick={handleJoinClick}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Go Back?
        </button>
      </div>
    </form>
  );
};

export default JoinForm;
