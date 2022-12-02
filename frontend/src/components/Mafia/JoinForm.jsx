import axios from "axios";
import React, { useState } from "react";
const JoinForm = ({ handleJoinClick }) => {
  const joinGame = (e) => {
    e.preventDefault();
    const playerName = e.target[0].value;
    const serverCode = e.target[1].value;

    console.log("Joining Game Server");
    const joinServer = async () => {
      try {
        console.log("...sending ajax create player post");
        const result = await axios.post(
          `http://localhost:8080/gamenight/server/mafia/player/${serverCode}`,
          {
            name: playerName,
          }
        );
        if (result.data.status === "OK") {
          console.log("Storing server to localStorage...");
          const server = await axios.get(
            `http://localhost:8080/gamenight/server/mafia/${serverCode}`
          );
          console.log(JSON.stringify(server));
          localStorage.setItem("server", JSON.stringify(server));
          localStorage.setItem("player", JSON.stringify(result.data));
          console.log("LocalStorage Successfully Set...");
          setIsError(false);
          window.location = `/mafia/server/play`;
        } else {
          console.log("LocalStorage Failed...");
        }
      } catch (e) {
        console.log("...error");
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
